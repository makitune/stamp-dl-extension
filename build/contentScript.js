"use strict";
var DataPreview = (function () {
    function DataPreview(type, id, animationURL, customBaseURL, customOverlayURL, fallbackStaticURL, popupURL, soundURL, staticURL) {
        this.type = type;
        this.id = id;
        this.animationURL = animationURL;
        this.customBaseURL = customBaseURL;
        this.customOverlayURL = customOverlayURL;
        this.fallbackStaticURL = fallbackStaticURL;
        this.popupURL = popupURL;
        this.soundURL = soundURL;
        this.staticURL = staticURL;
    }
    DataPreview.prototype.sticker = function () {
        switch (this.type) {
            case "animation":
                return new Sticker(this.id + "." + this.extension(), this.animationURL);
            case "popup":
                return new Sticker(this.id + "." + this.extension(), this.popupURL);
            case "sound":
                return new Sticker(this.id + "." + this.extension(), this.soundURL);
            default:
                return new Sticker(this.id + "." + this.extension(), this.staticURL);
        }
    };
    DataPreview.prototype.extension = function () {
        switch (this.type) {
            case "sound":
                return "m4a";
            default:
                return "png";
        }
    };
    return DataPreview;
}());
var Sticker = (function () {
    function Sticker(filename, url) {
        this.filename = filename;
        this.url = url;
    }
    return Sticker;
}());
function makeStamp() {
    var stamp = [];
    var list = document.getElementsByClassName("mdCMN09Li FnStickerPreviewItem");
    for (var i = 0; i < list.length; i++) {
        var element = list[i].getAttribute("data-preview");
        if (element != null) {
            var json = JSON.parse(element);
            var data = new DataPreview(json.type, json.id, json.animationUrl, json.customBaseUrl, json.customOverlayUrl, json.fallbackStaticUrl, json.popupUrl, json.soundUrl, json.staticUrl);
            stamp.push(data.sticker());
        }
    }
    return stamp;
}
chrome.runtime.sendMessage(makeStamp());
