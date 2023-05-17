chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "updateBadge") {
    // Update the badge text
    chrome.action.setBadgeText({
      text: message.badgeText,
      tabId: sender.tab.id,
    });
  }
});
