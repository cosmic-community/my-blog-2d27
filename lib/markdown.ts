import { marked } from 'marked'

// Configure marked for safe, clean HTML output
marked.setOptions({
  gfm: true,    // GitHub Flavored Markdown (tables, strikethrough, etc.)
  breaks: false, // Don't convert single newlines to <br>
})

/**
 * Convert a markdown string to an HTML string.
 * Returns an empty string if input is falsy.
 */
export function markdownToHtml(markdown: string | null | undefined): string {
  if (!markdown) return ''
  const result = marked(markdown)
  // marked() can return string | Promise<string>; it's sync when no async extensions are used
  return typeof result === 'string' ? result : ''
}
