chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "update") {
    const thisVersion = chrome.runtime.getManifest().version;
    chrome.tabs.create({
      url: chrome.runtime.getURL(`src/changelog/${thisVersion}.html`),
    });
  }
});
