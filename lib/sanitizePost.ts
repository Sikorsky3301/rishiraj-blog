import sanitizeHtml from 'sanitize-html'

export function sanitizePostBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em',
      'a', 'blockquote', 'code', 'pre', 'hr', 'br', 'img',
    ],
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt', 'title'] },
    allowedSchemes: ['http', 'https', 'mailto'],
  })
}
