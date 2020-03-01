class DataPreview {
  constructor(
    private type: string,
    private id: string,
    private animationURL: string,
    private customBaseURL: string,
    private customOverlayURL: string,
    private fallbackStaticURL: string,
    private popupURL: string,
    private soundURL: string,
    private staticURL: string
  ) {}

  sticker(): Sticker {
    switch (this.type) {
      case "animation":
        return new Sticker(this.id + "." + this.extension(), this.animationURL);

      // case "name":
      //   return new Sticker(this.id + "." + this.extension(), this.staticURL);

      case "popup":
        return new Sticker(this.id + "." + this.extension(), this.popupURL);

      case "sound":
        return new Sticker(this.id + "." + this.extension(), this.soundURL);

      // case "static":
      //   return new Sticker(this.id + "." + this.extension(), this.staticURL);

      default:
        return new Sticker(this.id + "." + this.extension(), this.staticURL);
    }
  }

  private extension(): string {
    switch (this.type) {
      // case "animation":
      //   return "png";

      // case "name":
      //   return "png";

      // case "popup":
      //   return "png";

      case "sound":
        return "m4a";

      // case "static":
      //   return "png";

      default:
        return "png";
    }
  }
}

class Sticker {
  constructor(public filename: string, public url: string) {}
}

function makeStamp(): Sticker[] {
  var stamp: Sticker[] = [];
  var list = document.getElementsByClassName("mdCMN09Li FnStickerPreviewItem");
  for (let i = 0; i < list.length; i++) {
    let element = list[i].getAttribute("data-preview");
    if (element != null) {
      let json = JSON.parse(element);
      let data = new DataPreview(
        json.type,
        json.id,
        json.animationUrl,
        json.customBaseUrl,
        json.customOverlayUrl,
        json.fallbackStaticUrl,
        json.popupUrl,
        json.soundUrl,
        json.staticUrl
      );
      stamp.push(data.sticker());
    }
  }
  return stamp;
}

chrome.runtime.sendMessage(makeStamp());
