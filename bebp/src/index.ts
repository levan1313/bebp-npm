import { fetchAndAssignSettings, getConvertedJS, replacePlaceholders } from "./utils";

const files = import.meta.glob("/src/template/*", { as: "raw", eager: true });

let htmlString = files["/src/template/index.html"];
let cssString = files["/src/template/style.css"];

getConvertedJS().then(async (jsString) => {
  const settings = await fetchAndAssignSettings();
  htmlString = replacePlaceholders(htmlString, settings);
  cssString = replacePlaceholders(cssString, settings);
  jsString = replacePlaceholders(jsString, settings);

  const template = document.createElement("template");
  template.innerHTML = `
    <style>${cssString}</style>
    ${htmlString}
  `;
  document.body.appendChild(template.content.cloneNode(true));

  const scriptTag = document.createElement("script");
  scriptTag.textContent = jsString;
  document.body.appendChild(scriptTag);
});
