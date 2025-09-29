// Minimal sanitizer: strips HTML tags and trims whitespace.
// For richer sanitization (preserving safe HTML) consider using DOMPurify on the client
export function sanitize(input: string) {
  if (!input) return '';
  // remove tags
  return input.replace(/<[^>]*>/g, '').trim();
}

export default sanitize;
