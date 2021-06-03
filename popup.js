onToggle = (on) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, on);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  var toggleBtn = document.getElementById("toggleBtn");

  toggleBtn.addEventListener("change", () => {
    if (toggleBtn.checked) {
      onToggle(true);
    } else {
      onToggle(false);
    }
  });
});
