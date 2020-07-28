const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const execSync = require('child_process').execSync;
const args = process.argv.slice(2);
const prettier = require('prettier');

const version = args[0] || 0.55;

fs.removeSync(`../versioned_docs/version-${version}`);
fs.removeSync(`../versioned_sidebars/version-${version}-sidebars.json`);

const versions = require('../versions.json');
versions.splice(versions.findIndex(v => v == version), 1);
fs.writeFileSync('versions.json', JSON.stringify(versions, null, 2));

execSync(`docusaurus-version ${version}`);

const files = glob.sync('../cndocs/*.md');
// const authorRegex = /(\d+) author (.+)$/gm;
const authorMailRegex = /(\d+) author-mail <(.+)>$/gm;
files.forEach(file => {
  // ../cndocs/webview.md
  const fileName = path.basename(file);
  const result = execSync(
    // `git blame --line-porcelain ${file} \
    //   | grep -I "^author " | sort | uniq -c | sort -nr; \
    // `
    `git blame --line-porcelain ${file} \
      | grep -I "^author-mail " | sort | uniq -c | sort -nr; \
    `
  ).toString();
  let authorData;
  const authors = [];
  authors.totalLineCount = 0;
  while ((authorData = authorMailRegex.exec(result)) !== null) {
    const lineCount = parseInt(authorData[1]);
    const mail = authorData[2];
    const name = mail.split('@')[0];
    authors.push({
      lineCount,
      name,
      // TODO
      // TODO https://developer.github.com/v3/repos/commits/#get-a-single-commit
      link: `https://github.com/search?q=${encodeURIComponent(
        name
      )}&type=Users`,
    });
    authors.totalLineCount += lineCount;
  }
  const authorList = generateAuthorList(authors);
  console.log(`${fileName}: ${authorList}`);
  const targetFile = `versioned_docs/version-${version}/${fileName}`;
  const mdData = fs.readFileSync(targetFile, 'utf8');
  const metaEndFlagString = '\n---\n';
  fs.writeFileSync(
    targetFile,
    prettier.format(
      mdData.replace(metaEndFlagString, metaEndFlagString + authorList),
      {parser: 'markdown'}
    )
    // mdData.replace(metaEndFlagString, metaEndFlagString + authorList)
  );
});

function generateAuthorList(authors) {
  const authorList = authors.map(({name, lineCount, link}) => {
    const contribution =
      ((lineCount / authors.totalLineCount) * 100).toFixed(2) + '%';
    return `[${name}](${link})(${contribution})`;
  });
  return '\n##### 本文档贡献者：' + authorList.join(', ') + '\n';
}
