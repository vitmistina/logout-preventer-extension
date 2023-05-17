const DEFAULT_TIME = 890;
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

let originalLocation = window.location.href;
const observeHref = function (mutationsList, observer) {
  if (window.location.href != originalLocation) {
    originalLocation = window.location.href;
    restartCountdown();
  }
};

/* 
    SCRIPT START
*/
restartCountdown();

document.addEventListener("keydown", restartCountdown, true);

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
    window.location.reload();
    return;
  }
  if (countdown < 0) {
    restartCountdown();
  }
}, 1000);
