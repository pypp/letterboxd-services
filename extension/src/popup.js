document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("modeSelect");

  // Load saved value
  chrome.storage.local.get("serviceMode", (data) => {
    if (data.serviceMode) {
      select.value = data.serviceMode;
    }
  });

  // Save on change
  select.addEventListener("change", () => {
    chrome.storage.local.set({ serviceMode: select.value });
  });
});
