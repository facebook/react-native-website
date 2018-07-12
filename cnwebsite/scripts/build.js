const getContributors = `
for file in $(git ls-files *.md); do \
    echo $file; \
    git blame --line-porcelain $file \
        | grep -I "^author " | sort | uniq -c | sort -nr; \
    echo; \
done
`;