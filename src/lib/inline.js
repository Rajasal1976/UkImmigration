// Turns text written in the admin into safe HTML. [link text](/page/) becomes a link;
// links to other websites open in a new tab. Everything else is shown as plain text.
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
export const inline = (text = '') => esc(text).replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s)]+)\)/g, (_, t, u) =>
  `<a href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
// The same text without link markup, for Google's structured data
export const plain = (text = '') => String(text).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
