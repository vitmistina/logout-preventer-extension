const defaultTime = 10;

let t = defaultTime;

document.addEventListener("keydown", function (event) {
  t = defaultTime;
  chrome.runtime.sendMessage({
    action: "updateBadge",
    badgeText: t.toString(),
  });
});

setInterval(function () {
  t = t - 1;
  if (t === 0) {
    window.location.reload();
    return;
  }
  chrome.runtime.sendMessage({
    action: "updateBadge",
    badgeText: t.toString(),
  });
  console.log(`Time remaining ${t}`);
}, 1000);
