import { Message } from "./messaging";

function parse() {
  const query = {
    ...Object.fromEntries(new URLSearchParams(window.location.search)),
  };
  let linkColour = "orange";
  let buttonColour = "blue";
  query?.reverse === "true" &&
    ([buttonColour, linkColour] = [linkColour, buttonColour]);

  return (<HTMLElement[]> [...document.querySelectorAll("a,button")]).map(
    (node) => {
      const name = node.nodeName?.toLowerCase();
      const isLink = name === "a";
      node.style.cssText = `outline: 2px solid ${
        isLink ? linkColour : buttonColour
      }`;
      return { name, ...(isLink && { href: node.getAttribute("href") }) };
    },
  );
}

chrome.runtime.sendMessage({
  message: Message.LOADED,
  payload: {
    data: parse(),
    URL: window.location.href,
  },
});

chrome.runtime.onMessage.addListener(({ message }) => {
  switch (message) {
    case Message.TAB_CHANGE:
      parse();
      break;
  }
});
