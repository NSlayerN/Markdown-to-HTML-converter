const inputEl = document.querySelector('#markdown-input');
const outputEl = document.querySelector('#html-output');
const previewEl = document.querySelector('#preview');

const headingRegex = /^\s*(#{1,3})\s+(.*)/gm;
const boldRegex = /\s(\*\*|__)(.*?)\1/gm;

function convertMarkdown() {
    let html = inputEl.value;

    // 1. Headings
    html = html.replace(/^\s*(#{1,3})\s+(.*)/gm, (_, hashes, text) => {
        const level = hashes.length;
        return `<h${level}>${text}</h${level}>`;
    });

    // 2. Blockquote
    html = html.replace(
        /^>\s*(.*)/gm,
        (_, text) => `<blockquote>${text}</blockquote>`,
    );

    // 3. Bold
    html = html.replace(
        /(\*\*|__)(.*?)\1/g,
        (_, __, boldText) => `<strong>${boldText}</strong>`,
    );

    // 4. Italic
    html = html.replace(
        /(\*|_)(.*?)\1/g,
        (_, __, italicText) => `<em>${italicText}</em>`,
    );

    // 5. Images
    html = html.replace(
        /!\[(.*?)\]\((.*?)\)/g,
        (_, alt, src) => `<img alt="${alt}" src="${src}">`,
    );

    // 6. Links
    html = html.replace(
        /\[(.*?)\]\((.*?)\)/g,
        (_, text, url) => `<a href="${url}">${text}</a>`,
    );

    return html;
}
inputEl.addEventListener('input', () => {
    const html = convertMarkdown();
    outputEl.textContent = html;
    previewEl.innerHTML = html;
});
