#!/usr/bin/env bash
set -euo pipefail

# Single source of truth for translation sync.
# Default output: candidate cndocs files that need resync.
# --report: print a human-readable timing report.
# Rule: if the upstream docs file is newer than the translated cndocs file,
# it must be resynced and cannot be skipped.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

PROGRESS_FILE="$REPO_ROOT/scripts/translate-progress.json"
MODE="list"
if [ "${1:-}" = "--report" ]; then
  MODE="report"
fi

# Ensure upstream exists
if ! git remote get-url upstream >/dev/null 2>&1; then
  echo "ERROR: missing upstream remote" >&2
  exit 2
fi

git fetch upstream --quiet

candidates=()
report_rows=()

collect_targets() {
  # Existing translated docs in the repo.
  if [ -d "$REPO_ROOT/cndocs" ]; then
    find "$REPO_ROOT/cndocs" -type f -name '*.md' -print | sed "s#^$REPO_ROOT/##"
  fi

  # Previously merged translations tracked by progress file.
  if [ -f "$PROGRESS_FILE" ]; then
    python3 -c "
import json
with open('$PROGRESS_FILE') as f:
    data = json.load(f)
for item in data.get('merged', []):
    print(item)
" 2>/dev/null || true
  fi

  # Source docs changed between production and upstream/main.
  changed_docs=$(git diff --name-only production..upstream/main -- 'docs/*.md' || true)
  if [ -n "${changed_docs}" ]; then
    while IFS= read -r source; do
      [ -z "$source" ] && continue
      target="cndocs/${source#docs/}"
      [ -f "$target" ] && echo "$target"
    done <<< "$changed_docs"
  fi
}

while IFS= read -r target; do
  [ -z "$target" ] && continue

  source="docs/${target#cndocs/}"

  upstream_epoch=$(git log -1 --format="%ct" upstream/main -- "$source" 2>/dev/null || echo 0)
  translation_epoch=$(git log -1 --format="%ct" production -- "$target" 2>/dev/null || echo 0)

  # Fallback for translations not yet present on production.
  if [ "$translation_epoch" -eq 0 ] 2>/dev/null; then
    translation_epoch=$(git log -1 --format="%ct" -- "$target" 2>/dev/null || echo 0)
  fi

  if [ "$MODE" = "report" ]; then
    upstream_date=$(git log -1 --format="%cd" upstream/main -- "$source" 2>/dev/null || echo "N/A")
    translation_date=$(git log -1 --format="%cd" production -- "$target" 2>/dev/null || echo "N/A")
    if [ "$translation_date" = "N/A" ]; then
      translation_date=$(git log -1 --format="%cd" -- "$target" 2>/dev/null || echo "N/A")
    fi
    if [ "$upstream_epoch" -gt "$translation_epoch" ] 2>/dev/null; then
      status="⚠️ Needs update"
    else
      status="✅ Up to date"
    fi
    report_rows+=("$target | $upstream_date | $translation_date | $status")
  fi

  if [ "$upstream_epoch" -gt "$translation_epoch" ] 2>/dev/null; then
    candidates+=("$target")
  fi
done < <(collect_targets | sort -u)

if [ "$MODE" = "report" ]; then
  echo "File | Upstream Update | Translation Update | Status"
  echo "--- | --- | --- | ---"
  if [ ${#report_rows[@]} -gt 0 ]; then
    printf '%s\n' "${report_rows[@]}"
  fi
  exit 0
fi

# Deduplicate and sort
if [ ${#candidates[@]} -gt 0 ]; then
  printf '%s\n' "${candidates[@]}" | sort -u
fi
