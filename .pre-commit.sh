git diff --staged --diff-filter=dx --name-only HEAD | grep ".*\.md$" | xargs -I % sh -c './website/node_modules/.bin/prettier --config website/.prettierrc --write %; git add %'

