# codeblockLanguageAsTitleRemarkPlugin

A custom [remark](https://github.com/remarkjs/remark) plugin that automatically sets the `title` metadata for code blocks in Markdown files based on the block's language.

## Features

- **Adds `title` Metadata**: For code blocks with a specified language (e.g., `js`, `python`), the plugin sets the `title` metadata to match the language.
- **Preserves Existing Metadata**: If the code block already contains metadata (`meta`) but lacks a `title`, the plugin appends the `title` without removing the existing metadata.
- **Ignores Code Blocks with Existing `title`**: If the `meta` field already includes a `title` property, the plugin does nothing to avoid overwriting it.
