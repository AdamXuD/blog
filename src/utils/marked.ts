import { marked } from "marked";
import hljs from "highlight.js";

const renderer = {
  table(header: string, body: string) {
    return `
      <div class="overflow-x-auto scroll">
        <table>
          <thead>
            ${header}
          </thead>
          <tbody>
            ${body}
          </tbody>
        </table>
      </div>
    `;
  },
  link(href: string, title: string, text: string) {
    return `
      <a href="${href}" title="${title}" target="_blank" class="break-words">
        ${text}
      </a>
    `;
  },
  image(href: string, title: string, text: string) {
    return `
      <img src="${href}" title="${title}" alt="${text}" class="w-4/5 sm:w-1/2 mx-auto rounded" />
    `;
  },
  code(code: string, infostring: string, escaped: boolean) {
    const langString = (infostring || "").match(/\S*/)?.[0] || "";
    const lang = hljs.getLanguage(langString) ? langString : "plaintext";
    const out = hljs.highlight(code, { language: lang }).value;

    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }

    if (!lang) {
      return `
        <pre class="scroll"><code>${escaped ? code : escape(code)}</code></pre>
      `;
    }
    return `
      <pre class="scroll"><code class="language-${escape(lang)}">${
      escaped ? code : escape(code)
    }</code></pre>`;
  },
};

marked.use({ renderer });

marked.setOptions({
  gfm: true,
  breaks: true,
});

export default marked;
