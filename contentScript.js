function toggleAds(display) {
  const adClasses = [
    "vdQmEd",
    "fP1Qef",
    "xpd",
    "EtOod",
    "pkphOe",
    "uEierd",
    "tvcap",
    "qGXjvb",
  ];
  adClasses.forEach((adClass) => {
    document.querySelectorAll("." + adClass).forEach((element) => {
      element.style.display = display;
    });
  });
}

let adsEnabledState;

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      if (adsEnabledState !== undefined) {
        toggleAds(adsEnabledState ? "none" : "");
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  adsEnabledState = request.adsEnabled;
  toggleAds(adsEnabledState ? "none" : "");
});

chrome.storage.sync.get(["adsEnabled"], function (result) {
  adsEnabledState = result.adsEnabled;
  toggleAds(adsEnabledState ? "none" : "");
});
