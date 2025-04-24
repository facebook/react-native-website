const fs = require('fs');
const https = require('https');
const url = require('url');
const path = require('path');

const OUTPUT_FILENAME = 'llms.txt';
const TITLE = 'React Native Documentation';
const DESCRIPTION =
  'React Native is a framework for building native apps using React. It lets you create mobile apps using only JavaScript and React.';
const URL_PREFIX = 'https://reactnative.dev/docs/';
const DOCS_PATH = '../docs/';

// Function to convert the TypeScript sidebar config to JSON
function convertSidebarConfigToJson(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Simple regex to extract the object between curly braces
  const exportPattern =
    /export default\s*({[\s\S]*?})\s*satisfies\s*SidebarsConfig;/;
  const match = fileContent.match(exportPattern);

  if (!match) {
    console.error('Could not find the sidebar configuration object');
    return null;
  }

  let configText = match[1];

  // Manual transformation approach
  try {
    // First, convert the TypeScript object to a JavaScript object using Function constructor
    const tempFn = new Function(`return ${configText}`);
    const jsObject = tempFn();
    return jsObject;
  } catch (error) {
    console.error('Error evaluating the configuration:', error);
    return null;
  }
}

// Function to extract URLs from sidebar config
function extractUrlsFromSidebar(sidebarConfig) {
  const urls = [];

  // Process each section (docs, api, components)
  Object.entries(sidebarConfig).forEach(([section, categories]) => {
    Object.entries(categories).forEach(([categoryName, items]) => {
      processItemsForUrls(items, urls);
    });
  });

  return urls;
}

// Recursive function to process items and extract URLs
function processItemsForUrls(items, urls) {
  items.forEach(item => {
    if (typeof item === 'string') {
      urls.push(`${URL_PREFIX}${item}`);
    } else if (typeof item === 'object') {
      if (item.type === 'doc' && item.id) {
        urls.push(`${URL_PREFIX}${item.id}`);
      } else if (item.type === 'category' && Array.isArray(item.items)) {
        processItemsForUrls(item.items, urls);
      }
    }
  });
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
function extractTitleFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*(.*)/);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
    }
    // If no title found, use the filename
    return filePath.split('/').pop().replace('.md', '');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return filePath.split('/').pop().replace('.md', '');
  }
}

// Function to map special cases for file names that don't match the sidebar
function mapDocPath(item) {
  const specialCases = {
    'environment-setup': 'getting-started.md',
    'native-platform': 'native-platforms.md',
    'turbo-native-modules-introduction': 'turbo-native-modules.md',
    'fabric-native-components-introduction': 'fabric-native-components.md',
  };

  if (typeof item === 'string') {
    return specialCases[item] || `${item}.md`;
  } else if (item.type === 'doc' && item.id) {
    return specialCases[item.id] || `${item.id}.md`;
  }
  return `${item}.md`;
}

// Function to generate markdown documentation
function generateMarkdown(sidebarConfig) {
  let markdown = `# ${TITLE}\n\n`;
  markdown += `> ${DESCRIPTION}\n\n`;
  markdown += `This documentation covers all aspects of using React Native, from installation to advanced usage.\n\n`;

  // Process each section (docs, api, components)
  Object.entries(sidebarConfig).forEach(([section, categories]) => {
    markdown += `## ${section.charAt(0).toUpperCase() + section.slice(1)}\n\n`;

    // Process each category within the section
    Object.entries(categories).forEach(([categoryName, items]) => {
      markdown += `### ${categoryName}\n\n`;

      // Process each item in the category
      items.forEach(item => {
        if (typeof item === 'string') {
          // This is a direct page reference
          const docPath = `${DOCS_PATH}${mapDocPath(item)}`;
          const title = extractTitleFromMarkdown(docPath);
          markdown += `- [${title}](${URL_PREFIX}${item})\n`;
        } else if (typeof item === 'object') {
          if (item.type === 'doc' && item.id) {
            // This is a doc reference with an explicit ID
            const docPath = `${DOCS_PATH}${mapDocPath(item)}`;
            const title = extractTitleFromMarkdown(docPath);
            markdown += `- [${title}](${URL_PREFIX}${item.id})\n`;
          } else if (item.type === 'category' && Array.isArray(item.items)) {
            // This is a category with nested items
            markdown += `#### ${item.label}\n\n`;
            item.items.forEach(nestedItem => {
              if (typeof nestedItem === 'string') {
                const docPath = `${DOCS_PATH}${mapDocPath(nestedItem)}`;
                const title = extractTitleFromMarkdown(docPath);
                markdown += `- [${title}](${URL_PREFIX}${nestedItem})\n`;
              } else if (nestedItem.type === 'doc' && nestedItem.id) {
                const docPath = `${DOCS_PATH}${mapDocPath(nestedItem)}`;
                const title = extractTitleFromMarkdown(docPath);
                markdown += `- [${title}](${URL_PREFIX}${nestedItem.id})\n`;
              }
            });
          }
        }
      });
    });
  });

  // Add newlines after all markdown headers
  markdown = markdown.replace(/(#+ .*)\n/g, '\n$1\n');

  return markdown;
}

const inputFilePath = './sidebars.ts';
const outputFilePath = inputFilePath.replace(/\.tsx?$/, '-urls.txt');

const sidebarConfig = convertSidebarConfigToJson(inputFilePath);
if (sidebarConfig) {
  const urls = extractUrlsFromSidebar(sidebarConfig);

  // First check URLs for 404 errors
  processUrls(urls)
    .then(result => {
      if (result.unavailableUrls.length === 0) {
        // Only generate documentation if all URLs are valid
        const markdown = generateMarkdown(sidebarConfig);
        fs.writeFileSync(path.join('build/', OUTPUT_FILENAME), markdown);
        console.log(
          `Successfully generated documentation to: ${OUTPUT_FILENAME}`
        );
      } else {
        console.error('Documentation generation skipped due to broken links');
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('Error processing URLs:', err);
      process.exit(1);
    });
} else {
  console.error('Failed to convert sidebar config to JSON');
  process.exit(1);
}
