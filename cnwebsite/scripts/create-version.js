const glob = require("glob");
const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;
const args = process.argv.slice(2);

const version = args[0] || 0.55;

execSync(`docusaurus-version ${version}`);

const files = glob.sync("../cndocs/*.md");
const authorRegex = /(\d+) author (.+)$/gm;
files.forEach(file => {
  // ../cndocs/webview.md
  const fileName = path.basename(file);
  const result = execSync(
    `git blame --line-porcelain ${file} \
      | grep -I "^author " | sort | uniq -c | sort -nr; \
    `
  ).toString();
  let authorData;
  const authors = [];
  authors.totalLineCount = 0;
  while ((authorData = authorRegex.exec(result)) !== null) {
    const lineCount = parseInt(authorData[1]);
    const name = authorData[2];
    authors.push({
      lineCount,
      name,
      link: `https://github.com/${name}`
    });
    authors.totalLineCount += lineCount;
  }
  const authorList = generateAuthorList(authors);
  console.log(`${fileName}: ${authorList}`);
  const targetFile = `versioned_docs/version-${version}/${fileName}`;
  const mdData = fs.readFileSync(targetFile, "utf8");
  const metaEndFlagString = "\n---\n";
  fs.writeFileSync(
    targetFile,
    mdData.replace(metaEndFlagString, metaEndFlagString + authorList)
  );
});

function generateAuthorList(authors) {
  const authorList = authors.map(({ name, lineCount, link }) => {
    const contribution =
      ((lineCount / authors.totalLineCount) * 100).toFixed(2) + "%";
    return `[${name}](${link})(${contribution})`;
  });
  return "`本文档贡献者：" + authorList.join(", ") + "`\n";
}
