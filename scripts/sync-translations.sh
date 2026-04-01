#!/usr/bin/env bash
set -euo pipefail

# Print candidate cndocs files that need translation sync.
# Two strategies combined:
#   A) Compare upstream/main vs local production for docs/*.md (new upstream changes)
#   B) For previously-merged translations, check if upstream file was updated
#      more recently than the cndocs translation — if so, re-translate.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

PROGRESS_FILE="$REPO_ROOT/scripts/translate-progress.json"

# Ensure upstream exists
if ! git remote get-url upstream >/dev/null 2>&1; then
  echo "ERROR: missing upstream remote" >&2
  exit 2
fi

git fetch upstream --quiet

candidates=()

# --- Strategy A: new upstream changes not yet in production ---
changed_docs=$(git diff --name-only production..upstream/main -- 'docs/*.md' || true)
if [ -n "${changed_docs}" ]; then
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    name="${f#docs/}"
    target="cndocs/${name}"
    if [ -f "$target" ]; then
      candidates+=("$target")
    fi
  done <<< "$changed_docs"
fi

# --- Strategy B: merged translations whose upstream source is now newer ---
if [ -f "$PROGRESS_FILE" ]; then
  merged_files=$(python3 -c "
import json, sys
with open('$PROGRESS_FILE') as f:
    data = json.load(f)
for item in data.get('merged', []):
    print(item)
" 2>/dev/null || true)

  if [ -n "$merged_files" ]; then
    while IFS= read -r target; do
      [ -z "$target" ] && continue
      # cndocs/foo.md -> docs/foo.md
      name="${target#cndocs/}"
      source="docs/${name}"

      # Get upstream last-modified epoch for the source file
      upstream_epoch=$(git log -1 --format="%ct" upstream/main -- "$source" 2>/dev/null || echo 0)
      # Get production last-modified epoch for the translated file
      translation_epoch=$(git log -1 --format="%ct" production -- "$target" 2>/dev/null || echo 0)

      if [ "$upstream_epoch" -gt "$translation_epoch" ] 2>/dev/null; then
        candidates+=("$target")
      fi
    done <<< "$merged_files"
  fi
fi

# Deduplicate and sort
if [ ${#candidates[@]} -gt 0 ]; then
  printf '%s\n' "${candidates[@]}" | sort -u
fi
