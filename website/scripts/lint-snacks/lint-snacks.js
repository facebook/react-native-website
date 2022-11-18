#!/usr/bin/env node
// Lints the SnackPlayer examples using eslint-config-react-native-community
// Options passed to the script (e.g. --fix) may be passed in.

const {execSync} = require('child_process');
const {randomBytes} = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

walk(path.join(__dirname, '../../..', 'docs'));

function walk(walkPath) {
  const dirents = fs.readdirSync(walkPath, {withFileTypes: true});
  for (const dirent of dirents) {
    const childPath = path.join(walkPath, dirent.name);
    if (dirent.isDirectory()) {
      walk(childPath);
    } else {
      lintFile(childPath);
    }
  }
}

function lintFile(filePath) {
  console.log(filePath);
  let fileContents = fs.readFileSync(filePath, {encoding: 'utf-8'});
  const snackRegex = /```SnackPlayer(.*)\n((((?!```).)*\n)+)```/g;

  const matches = fileContents.matchAll(snackRegex);
  for (const match of matches) {
    const snackURLParams = match[1].trim();
    const snackName = new URLSearchParams(snackURLParams).get('name');
    const snackContents = match[2];
    const tmpFile = path.join(
      __dirname,
      'tmp',
      randomBytes(16).toString('hex') + '.js'
    );
    fs.mkdirSync(path.join(__dirname, 'tmp'), {recursive: true});
    fs.writeFileSync(tmpFile, snackContents);

    const args = process.argv.slice(2).join(' ');
    const command = `npx eslint ${args} '${tmpFile}'`;
    console.log(` - ${snackName}`);

    try {
      execSync(command, {cwd: __dirname, stdio: 'inherit'});

      fileContents = fileContents.replace(
        snackContents,
        fs.readFileSync(tmpFile, {encoding: 'utf-8'})
      );
    } catch {
      process.exitCode = 1;
    } finally {
      fs.rmSync(tmpFile);
    }
  }

  fs.writeFileSync(filePath, fileContents);
}
