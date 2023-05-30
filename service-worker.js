chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  let startTime = Date.now();
  if (message.action === "startTimer") {
    startTime = Date.now();
  }
  if (message.action === "simulateActivity") {
    timeDifferenceInSeconds = (Date.now() - startTime) / 1000;
    console.log(sender, message.action, timeDifferenceInSeconds);
  }
  if (message.action === "updateBadge") {
    // Update the badge text
    chrome.action.setBadgeText({
      text: message.badgeText,
      tabId: sender.tab.id,
    });

    if ([...message.badgeText].pop() === "0") {
      timeDifferenceInSeconds = (Date.now() - startTime) / 1000;
      console.log(sender, message.action, timeDifferenceInSeconds);
    }
  }
});
