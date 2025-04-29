const fs = require('fs');
const https = require('https');
const url = require('url');
const path = require('path');
const ts = require('typescript');

const OUTPUT_FILENAME = 'llms.txt';
const TITLE = 'React Native Documentation';
const DESCRIPTION =
  'React Native is a framework for building native apps using React. It lets you create mobile apps using only JavaScript and React.';
const URL_PREFIX = 'https://reactnative.dev';

// Function to convert the TypeScript sidebar config to JSON
function convertSidebarConfigToJson(filePath) {
  const inputFileContent = fs.readFileSync(filePath, 'utf8');
  const tempFilePath = path.join(__dirname, 'temp-sidebar.js');

  try {
    const {outputText} = ts.transpileModule(inputFileContent, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2015,
      },
    });

    fs.writeFileSync(tempFilePath, outputText);

    // Clear require cache for the temp file
    delete require.cache[require.resolve(tempFilePath)];

    const sidebarModule = require(tempFilePath);

    return sidebarModule.default;
  } catch (error) {
    console.error('Error converting sidebar config:', error);
    return null;
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}

const SLUG_TO_URL = {
  'architecture-overview': 'overview',
  'architecture-glossary': 'glossary',
};

// Function to extract URLs from sidebar config
function extractUrlsFromSidebar(sidebarConfig, prefix) {
  const urls = [];

  // Process each section (docs, api, components)
  Object.entries(sidebarConfig).forEach(([_, categories]) => {
    Object.entries(categories).forEach(([_, items]) => {
      processItemsForUrls(items, urls, prefix);
    });
  });

  // Replace slugs with their mapped URLs
  urls.forEach((url, index) => {
    for (const [slug, mappedUrl] of Object.entries(SLUG_TO_URL)) {
      if (url.includes(slug)) {
        urls[index] = url.replace(slug, mappedUrl);
        break;
      }
    }
  });

  return urls;
}

// Recursive function to process items and extract URLs
function processItemsForUrls(items, urls, prefix) {
  if (typeof items === 'object' && Array.isArray(items.items)) {
    processItemsForUrls(items.items, urls, prefix);
    return;
  }

  if (Array.isArray(items)) {
    items.forEach(item => {
      if (typeof item === 'string') {
        urls.push(`${URL_PREFIX}${prefix}/${item}`);
      } else if (typeof item === 'object') {
        if (item.type === 'doc' && item.id) {
          urls.push(`${URL_PREFIX}${prefix}/${item.id}`);
        } else if (item.type === 'category' && Array.isArray(item.items)) {
          processItemsForUrls(item.items, urls, prefix);
        }
      }
    });
  }
}

// Function to check URL status
function checkUrl(urlString) {
  return new Promise(resolve => {
    const parsedUrl = url.parse(urlString);

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      method: 'HEAD',
      timeout: 5000,
    };

    const req = https.request(options, res => {
      resolve({
        url: urlString,
        status: res.statusCode,
        is404: res.statusCode === 404,
      });
    });

    req.on('error', error => {
      resolve({
        url: urlString,
        status: 'Error',
        is404: false,
        error: error.message,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url: urlString,
        status: 'Timeout',
        is404: false,
      });
    });

    req.end();
  });
}

// Process each URL
async function processUrls(urls) {
  const unavailableUrls = [];

  for (const urlToCheck of urls) {
    const result = await checkUrl(urlToCheck);
    if (
      result.is404 ||
      result.status === 'Error' ||
      result.status === 'Timeout'
    ) {
      unavailableUrls.push({
        url: urlToCheck,
        status: result.status,
        error: result.error || null,
      });
    }
  }

  const result = {
    totalUrls: urls.length,
    unavailableUrls: unavailableUrls,
  };

  if (unavailableUrls.length > 0) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(JSON.stringify(result, null, 2));
  }

  return result;
}

// Function to extract title from markdown frontmatter
function extractMetadataFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*(.*)/);
      const slugMatch = frontmatter.match(/slug:\s*(.*)/);

      return {
        title: titleMatch
          ? titleMatch[1].trim()
          : filePath.split('/').pop().replace('.md', ''),
        slug: slugMatch ? slugMatch[1].trim().replace(/^\//, '') : null,
      };
    }
    // If no frontmatter found, use the filename
    return {
      title: filePath.split('/').pop().replace('.md', ''),
      slug: null,
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return {
      title: filePath.split('/').pop().replace('.md', ''),
      slug: null,
    };
  }
}

// Function to map special cases for file names that don't match the sidebar
function mapDocPath(item, prefix) {
  const specialCases = {
    'environment-setup': 'getting-started.md',
    'native-platform': 'native-platforms.md',
    'turbo-native-modules-introduction': 'turbo-native-modules.md',
    'fabric-native-components-introduction': 'fabric-native-components.md',
  };

  if (prefix === '/contributing') {
    specialCases['overview'] = 'contributing-overview.md';
  }

  if (typeof item === 'string') {
    return specialCases[item] || `${item}.md`;
  } else if (item.type === 'doc' && item.id) {
    return specialCases[item.id] || `${item.id}.md`;
  }
  return `${item}.md`;
}

// Function to generate output for each sidebar
function generateMarkdown(sidebarConfig, docPath, prefix) {
  let markdown = '';

  // Process each section (docs, api, components)
  Object.entries(sidebarConfig).forEach(([section, categories]) => {
    markdown += `## ${section.charAt(0).toUpperCase() + section.slice(1)}\n\n`;

    // Process each category within the section
    Object.entries(categories).forEach(([categoryName, items]) => {
      markdown += `### ${categoryName === '0' ? 'General' : categoryName}\n\n`;

      if (typeof items === 'object' && Array.isArray(items.items)) {
        items = items.items;
      }
      const reorderedArray = items.every(item => typeof item === 'string')
        ? items
        : [...items].sort((a, b) =>
            typeof a === 'string' && typeof b !== 'string'
              ? -1
              : typeof a !== 'string' && typeof b === 'string'
                ? 1
                : 0
          );

      // Process each item in the category
      reorderedArray.forEach(item => {
        if (typeof item === 'string') {
          // This is a direct page reference
          const fullDocPath = `${docPath}${mapDocPath(item, prefix)}`;
          const {title, slug} = extractMetadataFromMarkdown(fullDocPath);
          markdown += `- [${title}](${URL_PREFIX}${prefix}/${slug ?? item})\n`;
        } else if (typeof item === 'object') {
          if (item.type === 'doc' && item.id) {
            // This is a doc reference with an explicit ID
            const fullDocPath = `${docPath}${mapDocPath(item, prefix)}`;
            const {title, slug} = extractMetadataFromMarkdown(fullDocPath);
            markdown += `- [${title}](${URL_PREFIX}${prefix}/${slug ?? item.id})\n`;
          } else if (item.type === 'category' && Array.isArray(item.items)) {
            // This is a category with nested items
            markdown += `#### ${item.label}\n\n`;
            item.items.forEach(nestedItem => {
              if (typeof nestedItem === 'string') {
                const fullDocPath = `${docPath}${mapDocPath(nestedItem, prefix)}`;
                const {title, slug} = extractMetadataFromMarkdown(fullDocPath);
                markdown += `- [${title}](${URL_PREFIX}${prefix}/${slug ?? nestedItem})\n`;
              } else if (nestedItem.type === 'doc' && nestedItem.id) {
                const fullDocPath = `${docPath}${mapDocPath(nestedItem, prefix)}`;
                const {title, slug} = extractMetadataFromMarkdown(fullDocPath);
                markdown += `- [${title}](${URL_PREFIX}${prefix}/${slug ?? nestedItem.id})\n`;
              }
            });
          }
        }
      });
    });
  });

  // Format and cleanup whitespaces
  return markdown.replace(/(#+ .*)\n/g, '\n$1\n').replace(/\n(\n)+/g, '\n\n');
}

const inputFilePaths = [
  {
    name: 'sidebars.ts',
    docPath: '../docs/',
    prefix: '/docs',
  },
  {
    name: 'sidebarsArchitecture.ts',
    docPath: './architecture/',
    prefix: '/architecture',
  },
  {
    name: 'sidebarsCommunity.ts',
    docPath: './community/',
    prefix: '/community',
  },
  {
    name: 'sidebarsContributing.ts',
    docPath: './contributing/',
    prefix: '/contributing',
  },
];

let output = `# ${TITLE}\n\n`;
output += `> ${DESCRIPTION}\n\n`;
output += `This documentation covers all aspects of using React Native, from installation to advanced usage.\n\n`;

const generateOutput = () => {
  const results = [];
  const promises = [];

  for (const {name, docPath, prefix} of inputFilePaths) {
    const inputFilePath = `./${name}`;

    const sidebarConfig = convertSidebarConfigToJson(inputFilePath);
    if (sidebarConfig) {
      const urls = extractUrlsFromSidebar(sidebarConfig, prefix);

      // First check URLs for 404 errors
      const promise = processUrls(urls)
        .then(result => {
          if (result.unavailableUrls.length === 0) {
            // Only generate documentation if all URLs are valid
            const markdown = generateMarkdown(sidebarConfig, docPath, prefix);
            results.push({markdown, prefix});
            console.log(`Successfully generated output from ${inputFilePath}`);
          } else {
            console.error(
              'Documentation generation skipped due to broken links'
            );
            process.exit(1);
          }
        })
        .catch(err => {
          console.error('Error processing URLs:', err);
          process.exit(1);
        });

      promises.push(promise);
    } else {
      console.error('Failed to convert sidebar config to JSON');
      process.exit(1);
    }
  }

  // Wait for all promises to complete before writing the file
  Promise.all(promises)
    .then(() => {
      // Sort results to ensure docs section is first
      results.sort((a, b) => {
        if (a.prefix === '/docs') return -1;
        if (b.prefix === '/docs') return 1;
        return 0;
      });

      // Combine all markdown content in the correct order
      output += results.map(r => r.markdown).join('\n');

      fs.writeFileSync(path.join('build/', OUTPUT_FILENAME), output);
      console.log(
        `Successfully generated documentation to: ${OUTPUT_FILENAME}`
      );
    })
    .catch(err => {
      console.error('Error during processing:', err);
      process.exit(1);
    });
};

generateOutput();
