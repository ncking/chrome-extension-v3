import { Message } from "./messaging";

chrome.runtime.onMessage.addListener(({ message, payload }) => {
  switch (message) {
    case Message.LOADED:
      const { URL, data } = payload;
      chrome.storage.local.set({ [URL]: data });
      break;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, { message: Message.TAB_CHANGE });
  }
});
