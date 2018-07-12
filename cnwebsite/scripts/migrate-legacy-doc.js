const path = require("path");
const fs = require("fs");

const versions = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
let count;
versions.forEach(v => {
  count = 0;
  const originalVersionPath = `../versioned_docs/0.${v}`;
  const destVersionPath = `../versioned_docs/version-0.${v}`;
  fs.mkdirSync(destVersionPath);
  const meta = require(`${originalVersionPath}/indexes.json`);
  const categories = meta.contains;
  const sidebar = {};
  categories.forEach(subgroup => {
    sidebar[subgroup.group] = [];
    subgroup.contains.forEach(docMeta => {
      if (docMeta.mdlink === undefined) {
        return;
      }
      count++;
      const originalMdfilePath = `${originalVersionPath}/${docMeta.mdlink}.md`;
      const destMdfilePath = `${destVersionPath}/${docMeta.mdlink}.md`;
      const mdData = fs.readFileSync(originalMdfilePath);
      const mdDataWithMeta = `---
id: version-0.${v}-${docMeta.mdlink}
title: ${docMeta.subject}
original_id: ${docMeta.mdlink}
---

`.concat(mdData);
      fs.writeFileSync(destMdfilePath, mdDataWithMeta);
      sidebar[subgroup.group].push(`version-0.${v}-${docMeta.mdlink}`);
    });
    if (sidebar[subgroup.group].length === 0) {
      delete sidebar[subgroup.group];
    }
  });
  const sidebarKey = `version-0.${v}-docs`;
  const sidebarJson = {
    [sidebarKey]: sidebar
  };
  fs.writeFileSync(
    `../versioned_sidebars/version-0.${v}-sidebars.json`,
    JSON.stringify(sidebarJson, null, 2)
  );
  console.log(`0.${v} ${count} done`);
});
