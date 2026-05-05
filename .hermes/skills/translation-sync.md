---
name: react-native-website-translation-sync
description: Re-run and work through React Native website Chinese translation sync batches in reactnativecn/react-native-website, including candidate verification, false-positive handling, branching, and commit workflow.
triggers:
  - User asks to re-trigger or continue the React Native Chinese docs translation sync task
  - Working in /home/ubuntu/react-native-website
  - Need to process candidates from scripts/sync-translations.sh
---

# React Native website translation sync

Use this for the `reactnativecn/react-native-website` repo when the goal is to re-trigger the translation sync task, verify candidates, update `cndocs/*`, and prepare commits/PRs.

## Key findings to remember

1. `scripts/sync-translations.sh` is the source of truth for candidate discovery, but it can keep listing files that are already fixed on the current working branch.
2. The reason: the script compares upstream doc timestamps against the translation timestamp on `production` (or fallback history), so until changes are merged back to `production`, recently fixed files may still appear as candidates.
3. Do not assume every listed candidate needs editing. Verify each one against `docs/*` vs `cndocs/*` before touching it.
4. In this repo/user workflow, always create a fresh branch for new work rather than reusing an existing working branch.
5. Untracked helper files like `chinese_files.txt` and `english_files.txt` may exist; avoid staging them unless explicitly requested.
6. After a PR merges, refresh local `production` (`git fetch origin && git checkout production && git pull --ff-only origin production`) before starting the next sync batch, then branch fresh from updated `production`. **Note**: after switching to `production`, a stale `yarn.lock` modification from a previous branch (e.g. `cnwebsite-cut-0.85`) may linger in the working tree. Reset it with `git checkout -- yarn.lock` before branching.
7. `gh pr create` may fail with bogus GraphQL errors like `Head sha can't be blank`, `Base sha can't be blank`, `No commits between production and <branch>`, even when the branch exists and GitHub compare shows commits ahead. In that case, verify with `gh api repos/<owner>/<repo>/compare/production...<branch>` and create the PR through `gh api repos/<owner>/<repo>/pulls -X POST ...` instead of retrying blindly. **Important**: for multi-line PR bodies, do not mix `gh api ... -f title=... -f head=... -f base=... --input body.md`; GitHub will reject it with `Problems parsing JSON`. The reliable path is: write a full JSON payload file (`{"title":...,"head":...,"base":...,"body":...}`) and send it with `gh api repos/<owner>/<repo>/pulls --method POST --input payload.json`.
8. In this repo, do not run `git fetch origin upstream` as a single command when you mean “fetch both remotes” — Git treats `upstream` as a refspec for `origin` and errors with `couldn't find remote ref upstream`. Use two commands: `git fetch origin && git fetch upstream`.
9. When the user says to keep working on the current PR, stay on the existing PR branch, commit additional batches there, and `git push` to update the same PR instead of opening a new one.
10. Some flagged files are easiest to sync by replacing the whole translated body, not patching line-by-line. This is especially true when upstream has converted an old API page into a short “removed” notice (`datepickerandroid`, `datepickerios`) or has heavily restructured a page (`debugging`, `introduction`, `more-resources`).
11. A useful batching heuristic: first parallel-check several candidates, then sort them into (a) already synced, (b) small/medium bounded patch, (c) full-page rewrite. Commit one coherent batch at a time and push it to the current PR.
12. If this repo shares PR numbers with upstream/fork remotes, avoid bare `gh pr view <number>` for verification — it can resolve the wrong repository’s PR. Use repo-scoped queries like `gh api repos/reactnativecn/react-native-website/pulls/<number>` when confirming the created PR.

## Pre-categorization with execute_code (recommended before subagents)

Before spawning subagents, use `execute_code` to cheaply sort candidates into categories. This costs nothing compared to full subagent runs:

```python
import os, re
os.chdir('/home/ubuntu/react-native-website')

for name in candidates:
    with open(f"docs/{name}.md") as f: en = f.read()
    with open(f"cndocs/{name}.md") as f: cn = f.read()
    en_lines = len(en.split('\n'))
    # Stub check: EN < 20 lines = removed component
    # Header comparison: count headers in both, diff lines
    # Drift pattern scan: SafeAreaView, className, admonition, react.dev URL, tsx fence
    # Sort into: stubs / already_synced / small_drift / medium_drift / large_drift
```

Key checks:

- **Orphan detection**: `for f in <list>; do [ -f "docs/$f.md" ] && echo EXISTS || echo MISSING; done`
- **Stub check**: EN file < 20 lines **and** contains "removed" or danger/admonition = "removed from RN" stub. If EN < 20 lines but has real content (e.g., `what-is-codegen` at 15 lines), it's a short complete page — verify by reading both files before categorizing as stub.
- **Already synced**: line diff < 5 AND same header count
- **Drift pattern scan**: For each pattern in the table below, check two things:
  - (a) Does CN have **outdated** patterns? (e.g., `class=` instead of `className=`, `jsx` instead of `tsx`, `reactjs.org` instead of `react.dev`, blockquote `> **` instead of `:::note`). If yes → drift.
  - (b) Does EN have **newer** patterns that CN is **missing**? (e.g., EN has `tsx` fence but CN only has `jsx`). If yes → drift.
  - If CN already uses the newer pattern → no drift on that front.
- Then spawn subagents only for files with actual drift (typically 5-15 out of 40 candidates)

## Recommended workflow

1. Check repo state:
   - `git status --short --branch`
   - `git log --oneline --decorate -5`
   - confirm repo is `/home/ubuntu/react-native-website`

2. **Sync from upstream first** (重要！同步 website/ 配置、依赖、docs/ 等):
   - `git fetch origin && git fetch upstream`
   - `git checkout production && git pull --ff-only origin production`
   - `git merge upstream/main` — 合并上游最新改动
   - 如果有冲突（尤其是 `cndocs/`、`cnwebsite/`、`yarn.lock`），解决后 `git merge --continue`
   - `git push origin production` — 推送更新后的 production 到 fork
   - 注意：此步骤同步的是 `website/`、`package.json`、`docs/`（供参考）等非 CN 特有的文件

3. Re-trigger candidate discovery:
   - `bash scripts/sync-translations.sh`
   - optionally `bash scripts/sync-translations.sh --report`

4. Create a fresh branch immediately for the new batch, e.g.:
   - `git checkout -b auto-translate-YYYYMMDD-batch`

5. Triage candidates before editing (use pre-categorization above):
   - Prioritize the files the user mentioned, or a small batch first.
   - For each candidate, compare `docs/<name>.md` with `cndocs/<name>.md`.
   - Use subagents/delegation if several large docs need drift inspection in parallel.
   - Preserve code blocks, anchors, API names, tables, and markdown structure.

6. Only patch actual drift:
   - Add missing sections introduced upstream.
   - Update changed prose while keeping terminology consistent.
   - Skip files that are already aligned even if the script still flags them.

5.5. **Sync website/ config and deps to cnwebsite/**

- After merging upstream, check what changed in `website/`: `git diff production~1..production -- website/` or compare merge commits
- Key files to sync: `website/package.json` → `cnwebsite/package.json`（依赖版本一致）、`website/docusaurus.config.ts`（新插件/配置项）、`website/babel.config.js`、`website/tsconfig.json` 等
- 注意保留 CN 特有配置：
  - `cnwebsite/docusaurus.config.ts` 的 `docs.path` 必须是 `../cndocs`
  - `cnwebsite/sidebars.ts` 保持中文分类名
- 如有冲突手动解决，确保 cnwebsite 能正常构建
- 将 cnwebsite/ 变更与翻译文件一起提交到同一个 PR

6. Validate before commit:
   - `git diff --stat`
   - `git diff -- cndocs/<file>.md`
   - confirm no unrelated files are staged

7. Commit only the intended translation files:
   - `git add cndocs/<file>.md ...`
   - `git commit -m "docs(cndocs): ..."`

8. When reporting status to the user, explicitly mention if a file still appears in `sync-translations.sh` output only because it has not yet been merged into `production`.

## Good decision rules

- If the script lists many files, do not try to edit all of them blindly in one pass.
- If a candidate is already in sync, leave it unchanged and note it as a false positive/stale candidate.
- If one file has an obvious, bounded drift (missing methods/sections), fix and commit that first.
- Prefer small, well-bounded docs first (`AccessibilityInfo`, `DevSettings`, `_remove-global-cli`, `Dimensions`) before taking on very large drift-heavy files like `flatlist.md`.
- When many candidates are flagged, use parallel subagent comparisons to sort them into: already synced / small patch / large rewrite. This keeps the main context small and helps choose the next batch rationally.
- Do not rely only on `git diff production..upstream/main -- 'docs/*.md'` for scope. The current timing-based sync script can surface older docs whose upstream timestamp is newer than the translation on `production`, even if they are not in the simple branch diff.

## Example from experience

During a re-triggered batch on 2026-04-10:

- `cndocs/accessibilityinfo.md` really was missing upstream additions and needed patching.
- `cndocs/view-style-props.md` was already aligned and required no edits.
- `cndocs/turbo-native-modules-ios.md` already had prior branch changes, but the sync script still listed it because the changes were not on `production` yet.

## Pitfalls

- Do not treat `sync-translations.sh` output as proof that a file still needs translation.
- Do not reuse an old working branch for a new user-requested batch.
- Do not stage helper/untracked text files by accident.
- Do not rewrite already-synced files just to silence the candidate list; that list may stay stale until merge-to-production happens.
- When using `delegate_task` for parallel work, the default `max_concurrent_children` is 3. If you pass 4+ tasks, the tool call fails. Split into batches of 3 or fewer, or increase `delegation.max_concurrent_children` in config.
- Subagents with many large files to read will burn through iterations on read_file alone and never get to the actual editing. For very large files (2000+ lines), give the subagent section-by-section instructions with explicit line ranges, or process them with `execute_code` in the parent context.

## Orphaned CN files (EN source deleted upstream)

Some candidates flagged by the sync script have no corresponding `docs/<name>.md` — the English source was deleted upstream. These are CN-only orphans that should be removed:

1. Before translating, verify each candidate has an EN source: `for f in <list>; do [ -f "docs/$f.md" ] && echo EXISTS || echo MISSING; done`
2. Delete orphaned CN files in bulk: `rm -v cndocs/<orphan1>.md cndocs/<orphan2>.md ...`
3. Commit them as cleanup: `docs(cndocs): remove orphaned files (EN source deleted upstream)`

Other candidates have EN sources that were replaced with a short "Removed from React Native" stub (e.g., `datepickerandroid`, `datepickerios`, `imagepickerios`, `segmentedcontrolios`, `timepickerandroid`, `statusbarios`). In this case, replace the CN file with a matching Chinese stub:

```markdown
---
id: <name>
title: '❌ <ComponentName>'
---

:::danger 已从 React Native 中移除
请使用[社区包](https://reactnative.directory/?search=<query>)替代。
:::
```

## ⚠️ CN 文档不 promote Expo

**CN 文档与 EN 上游的重要差异：不要 promote 使用 Expo。** 如果 EN 上游将某文档重写为 Expo-first 内容（如 `getting-started.md`），CN 版本不应照搬。应保留原有非 Expo 内容，或调整为不以 Expo 为中心的写法。这是一个长期维护的差异点，每次翻译同步时都需要注意。

具体表现：

- `getting-started.md`: EN 已改为 Expo-first 短页面 → CN 保留旧的多平台搭建指南
- 其他文档中如果 EN 推荐用 `npx expo ...` 等 Expo 命令，CN 可保留原来的 `npx react-native ...` 方式

## Common drift patterns to apply across files

When many files need syncing, these patterns recur frequently and can be applied systematically:

| Pattern              | EN                                      | CN (outdated)          |
| -------------------- | --------------------------------------- | ---------------------- |
| SafeAreaView import  | `from 'react-native-safe-area-context'` | `from 'react-native'`  |
| HTML class attribute | `className=`                            | `class=`               |
| Admonition syntax    | `:::note` / `:::warning` / `:::info`    | `> **...**` blockquote |
| Code fence language  | `tsx`                                   | `jsx`                  |
| GitHub branch ref    | `/blob/main/`                           | `/blob/master/`        |
| React docs URLs      | `https://react.dev/`                    | `https://reactjs.org/` |
| Expo docs URLs       | `docs.expo.dev/`                        | `docs.expo.io/`        |

## CN 网站结构

CN 中文网有独立的构建目录 `cnwebsite/`（不是根目录的 `website/`）：

```
react-native-website/
├── cndocs/                          # CN 文档源文件（EN 的 docs/ 对应）
├── website/                         # EN 网站构建
│   ├── sidebars.ts                  # EN 侧边栏
│   ├── versions.json                # EN 版本列表
│   ├── versioned_docs/              # EN 版本化文档
│   └── versioned_sidebars/          # EN 版本化侧边栏
└── cnwebsite/                       # CN 网站构建
    ├── sidebars.ts                  # CN 侧边栏（中文分类名）
    ├── versions.json                # CN 版本列表
    ├── versioned_docs/              # CN 版本化文档
    ├── versioned_sidebars/          # CN 版本化侧边栏
    └── scripts/create-version.js    # 版本 cut 脚本
```

- `cnwebsite/docusaurus.config.ts` 中 `docs.path` 指向 `../cndocs`
- CN 侧边栏 (`cnwebsite/sidebars.ts`) 使用中文分类名（入门基础、环境搭建 等）
- EN 和 CN 的版本列表可能不同步（如 EN 有 0.85 但 CN 最高只有 0.84）

## Cut 新版本流程

当上游 EN 发布新 RN 版本（如 0.85）需要为 CN 网站 cut 对应版本：

1. **对比侧边栏差异**：比较 EN 版本化侧边栏 (`website/versioned_sidebars/version-X.Y-sidebars.json`) 和 CN 侧边栏 (`cnwebsite/sidebars.ts`)，找出 CN 缺失的条目
2. **补充 CN 侧边栏**：在 `cnwebsite/sidebars.ts` 中添加缺失条目到对应分类
3. **安装依赖**：`cd react-native-website && yarn install`
4. **执行 cut**：`cd cnwebsite && yarn docusaurus docs:version X.Y`
5. **同步静态资源**：检查新版本文档里通过 `/docs/assets/...` 引用的图片/媒体，确认它们在 `cnwebsite/static/docs/assets/` 中也存在。可用脚本扫描 `cnwebsite/versioned_docs/version-X.Y/**/*.md` 中的 `/docs/assets/` 引用，并把缺失文件从 `website/static/docs/assets/` 或 `cndocs/assets/` 复制到 `cnwebsite/static/docs/assets/`。否则构建时会报 `Markdown image ... couldn't be resolved to an existing local image file`。
6. **验证**：检查 `cnwebsite/versions.json` 已更新，`cnwebsite/versioned_docs/version-X.Y/` 已创建，并确认 `/docs/assets/` 引用没有缺失静态资源
7. **跑构建验证**：执行 `yarn --cwd cnwebsite build`。这一步不仅能抓到缺失静态资源，也能抓到版本化文档里的 MDX 结构错误（例如 `linking.md` 中缺少 `</TabItem>` / `</Tabs>` 之类的闭合标签，报错通常是 `Expected a closing tag for <TabItem>`）。
8. **提交**：`cnwebsite/versions.json`、`cnwebsite/versioned_docs/version-X.Y/`、`cnwebsite/versioned_sidebars/`、`cnwebsite/sidebars.ts`，以及新增的 `cnwebsite/static/docs/assets/**`

对比侧边栏差异的技巧：

```bash
# EN 侧边栏条目
python3 -c "import json; d=json.load(open('website/versioned_sidebars/version-0.85-sidebars.json')); ..."
# CN 侧边栏条目
grep -oP "'[a-zA-Z][a-zA-Z0-9/_.-]*'" cnwebsite/sidebars.ts
```

## Verification checklist

- Fresh branch created
- Candidates re-generated from script
- Each edited file manually verified against source
- Only intended `cndocs/*` files committed
- User informed about any stale candidates caused by `production`-based timestamp checks
