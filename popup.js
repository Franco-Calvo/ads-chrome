document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggleButton");

  chrome.storage.sync.get(["adsEnabled"], function (result) {
    btn.textContent = result.adsEnabled
      ? "Mostrar patrocinados"
      : "Ocultar patrocinados";
  });

  btn.addEventListener("click", () => {
    chrome.storage.sync.get(["adsEnabled"], function (result) {
      const newState = !result.adsEnabled;
      chrome.storage.sync.set({ adsEnabled: newState }, function () {
        btn.textContent = newState
          ? "Mostrar patrocinados"
          : "Ocultar patrocinados";
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { adsEnabled: newState });
          }
        );
      });
    });
  });
});
