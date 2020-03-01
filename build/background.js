"use strict";
function download(sticker) {
    chrome.downloads.download({
        url: sticker.url,
        filename: sticker.filename
    });
}
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(function () {
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
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId != contextMenuId) {
        return;
    }
    console.log(stamp);
});
var contextMenuId = "contextMenu";
var stamp = [];
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var _a, _b;
    stamp = message;
    if (((_b = (_a = sender) === null || _a === void 0 ? void 0 : _a.tab) === null || _b === void 0 ? void 0 : _b.id) == null || message == null) {
        return;
    }
    if (stamp.length == 0) {
        chrome.pageAction.hide(sender.tab.id);
    }
    else {
        chrome.pageAction.show(sender.tab.id);
    }
});
chrome.pageAction.onClicked.addListener(function () {
    if (stamp.length == 0) {
        return;
    }
    stamp.forEach(function (sticker) {
        download(sticker);
    });
});
