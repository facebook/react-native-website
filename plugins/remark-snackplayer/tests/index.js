const path = require('path');
const fs = require('fs');
const test = require('tape');
const remark = require('remark');
const snackplayer = require('../');

function read(name) {
  return fs.readFileSync(path.join(__dirname, name), 'utf8');
}

test('remark-snackplayer', async t => {
  const processor = remark().use(snackplayer);

  processor.process(read('markdown/test1.md'), (err, file) => {
    if (err) t.fail('Failed to process markdown/test1.md');
    t.equal(String(file), read('output/output1.html'), 'With 1 Code Block');
  });

  processor.process(read('markdown/test2.md'), (err, file) => {
    if (err) t.fail('Failed to process markdown/test2.md');
    t.equal(String(file), read('output/output2.html'), 'With 2 Code Blocks');
  });
});
