document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggleButton");
  const statusText = document.getElementById("adsStatus");

  chrome.storage.sync.get(["adsEnabled"], function (result) {
    if (result.hasOwnProperty("adsEnabled")) {
      btn.checked = result.adsEnabled;
      statusText.textContent = result.adsEnabled ? "Hidden ads" : "Visible ads";
    } else {
      btn.checked = false;
      statusText.textContent = "Hidden ads";
    }
  });

  btn.addEventListener("change", () => {
    const newState = btn.checked;
    chrome.storage.sync.set({ adsEnabled: newState }, function () {
      statusText.textContent = newState ? "Hidden ads" : "Visible ads";
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { adsEnabled: newState });
      });
    });
  });
});
