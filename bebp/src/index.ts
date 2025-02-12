import { getConvertedJS, replaceSettingsPlaceholders } from "./utils";
import settingsCreator from "./template/settings";

const files = import.meta.glob("/src/template/*", { as: "raw", eager: true });

let htmlString = files["/src/template/index.html"];
let cssString = files["/src/template/style.css"];
// let settings = files["/src/template/settings.bjs"];

const settings = settingsCreator.getSettings();

getConvertedJS().then(async (jsString) => {
  htmlString = replaceSettingsPlaceholders(htmlString, settings);
  cssString = replaceSettingsPlaceholders(cssString, settings);
  jsString = replaceSettingsPlaceholders(jsString, settings);

  console.log("this is setings",settings);
  const template = document.createElement("template");
  template.innerHTML = `
    <style>${cssString}</style>
    ${htmlString}
  `;
  console.log(settings)

  document.body.appendChild(template.content.cloneNode(true));

  const scriptTag = document.createElement("script");
  scriptTag.textContent = jsString;
  document.body.appendChild(scriptTag);
});


import { myFetch } from "./fetchHelper.util";
import { EndpointInfoI } from "element_interfaces";
import { GlobalI } from "./globals";

export const setupGlobals = async () => {
    window.myFetch = myFetch;   
}


declare type ParamsType = {
    body: {};
} | {
    query: {};
} | {
    body: {};
    query: {};
} | undefined;
declare global {
  interface Window {
    myFetch: <T, Q extends ParamsType>(endpointInfo: EndpointInfoI<T, Q> ) => Promise<T>;
    globalConfig: GlobalI; // Ensure this property exists
  }
}