const DEFAULT_TIME = 10;
let countdown = DEFAULT_TIME;

const formatTime = (t) => {
  const minutes = Math.floor(t / 60);
  const seconds = t % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const restartCountdown = () => {
  countdown = DEFAULT_TIME;
  chrome.runtime.sendMessage({
    action: "updateBadge",
    badgeText: formatTime(countdown),
  });
};

const restartCountdownForAlphabetKeys = (event) => {
  const key = event.key;
  const isAlphabetOrNumber = /^[a-zA-Z0-9ČĎŘŠŤŽčďřšťž]$/.test(key);
  if (isAlphabetOrNumber) {
    restartCountdown();
  }
};

let originalLocation = window.location.href;
const observeHref = function (mutationsList, observer) {
  if (window.location.href != originalLocation) {
    originalLocation = window.location.href;
    restartCountdown();
  }
};

const simulateActivity = () => {
  // Get the current URL
  // const url = new URL(window.location.href);

  // // Check if the "t" query parameter is present
  // if (url.searchParams.has("t")) {
  //   // Change the value of the "t" query parameter to Date.now()
  //   url.searchParams.set("t", Date.now());
  // } else {
  //   // Add the "t" query parameter with the value of Date.now()
  //   url.searchParams.append("t", Date.now());
  // }

  // // Navigate to the new URL
  // window.location.href = url.href;

  // // Create a new keydown event
  // const event = new KeyboardEvent("keydown", {
  //   key: "*", // Specify the key as an asterisk
  //   keyCode: 56, // Specify the key code for the asterisk key
  //   which: 56, // Specify the which property for the asterisk key
  // });

  // Dispatch the event to the document
  // document.dispatchEvent(event);
  // document.querySelector("#O365_AppName").click();
  document.querySelector("div[role='tablist'] #\\33").click();
  restartCountdown();
  setTimeout(
    () => document.querySelector("div[role='tablist'] #\\31").click(),
    200
  );
  // setTimeout(() => window.location.reload(), 400);

  // calendarButton =
  //   document.querySelector("#LeftRail button[aria-label='Calendar']") ||
  //   document.querySelector("#LeftRail button[aria-label='Kalendář']");
  // calendarButton.click();
  // setTimeout(() => document.querySelector("#O365_AppName").click(), 1000);
  // chrome.runtime.sendMessage({
  //   action: "simulateActivity",
  // });
};

/* 
    SCRIPT START
*/
chrome.runtime.sendMessage({
  action: "startTimer",
});

restartCountdown();

document.addEventListener("keydown", restartCountdownForAlphabetKeys, true);

const locationObserver = new MutationObserver(observeHref);
locationObserver.observe(document.querySelector("head"), {
  attributes: true,
  childList: true,
});

setInterval(function () {
  countdown = countdown - 1;
  chrome.runtime.sendMessage({
    action: "updateBadge",
    badgeText: formatTime(countdown),
  });
  if (countdown === 0) {
    simulateActivity();
  }
  if (countdown < 0) {
    restartCountdown();
  }
}, 1000);
