---
id: release-troubleshooting
title: Troubleshooting
---

### Manually set npm tags

Say you accidentally forgot to mark a release as "latest" or "next"?

```bash
# You'll need to first login:
npm login

# Add a tag to a version
npm dist-tag add <pkg>@<version> [<tag>]

# Remove a tag to a version
npm dist-tag rm <pkg>@<version> <tag>

# List tags for react-native
npm dist-tag ls [<pkg>]

# Example of setting latest to 0.66.4
npm dist-tag add react-native@0.66.4 latest
```

### Add Git Tags

Say you accidentally forgot to add a tags to the release?

```bash
# Delete a tag (annotated or not) locally, then push to delete it remotely
git tag --delete tagname
git push origin :tagname

# Add an annotated tag
git tag -a v0.65.3 -m "whatever message"

# Make sure you pull with tags
git pull <remote> <branch> --tags

# Make sure you push any local tags you added/removed
git push <remote> <branch> --follow-tags
```
