function download(sticker: Sticker) {
  chrome.downloads.download({
    url: sticker.url,
    filename: sticker.filename
  });
}

chrome.runtime.onInstalled.addListener(function(
  details: chrome.runtime.InstalledDetails
) {
  // chrome.contextMenus.create({
  //   title: "スタンプを保存",
  //   contexts: ["all"],
  //   type: "normal",
  //   id: contextMenuId
  // });

  chrome.declarativeContent.onPageChanged.removeRules(function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              schemes: ["https"],
              hostEquals: "store.line.me",
              pathPrefix: "stickershop/product"
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.contextMenus.onClicked.addListener(function(
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab | undefined
) {
  if (info.menuItemId != contextMenuId) {
    return;
  }

  console.log(stamp);
});

const contextMenuId = "contextMenu";
var stamp: Sticker[] = [];

chrome.runtime.onMessage.addListener(function(
  message: Sticker[],
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  stamp = message;

  if (sender?.tab?.id == null || message == null) {
    return;
  }

  if (stamp.length == 0) {
    chrome.pageAction.hide(sender.tab.id);
  } else {
    chrome.pageAction.show(sender.tab.id);
  }
});

chrome.pageAction.onClicked.addListener(function() {
  if (stamp.length == 0) {
    return;
  }

  stamp.forEach(sticker => {
    download(sticker);
  });
});
