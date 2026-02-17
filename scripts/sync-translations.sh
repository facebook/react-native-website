#!/usr/bin/env bash
set -euo pipefail

# Print candidate cndocs files that likely need translation sync
# Strategy:
# 1) Compare upstream/main vs local production for docs/*.md
# 2) Map changed docs/<name>.md -> cndocs/<name>.md when target exists
# 3) Output unique, sorted cndocs paths (one per line)

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# Ensure upstream exists
if ! git remote get-url upstream >/dev/null 2>&1; then
  echo "ERROR: missing upstream remote" >&2
  exit 2
fi

git fetch upstream --quiet

# Changed docs files between production and upstream/main
changed_docs=$(git diff --name-only production..upstream/main -- 'docs/*.md' || true)

if [ -z "${changed_docs}" ]; then
  exit 0
fi

while IFS= read -r f; do
  [ -z "$f" ] && continue
  name="${f#docs/}"
  target="cndocs/${name}"
  if [ -f "$target" ]; then
    echo "$target"
  fi
done <<< "$changed_docs" | sort -u
