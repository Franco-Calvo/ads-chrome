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

function hideSponsoredResults() {
  adClasses.forEach((adClass) => {
    document.querySelectorAll("." + adClass).forEach((element) => {
      element.style.display = "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", hideSponsoredResults);
