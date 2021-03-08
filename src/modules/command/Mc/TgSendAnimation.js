const AbstractMc = require("./AbstractMc");

class TgSendAnimation extends AbstractMc {
  action() {
    return "send-telegram";
  }

  requiredKey() {
    return ["from", "to", "content"];
  }

  from(from, contactType = "bot_username") {
    this.requestData.from = {};
    this.requestData.from.id = from;
    this.requestData.from.type = contactType;
    return this;
  }

  to(to, contactType = "chat_id") {
    this.requestData.to = {};
    this.requestData.to.id = to;
    this.requestData.to.type = contactType;
    return this;
  }

  content(url, text) {
    this.requestData.content = {};
    this.requestData.content.rich_media_url = url;
    this.requestData.content.type = "animation";
    this.requestData.content.text = text;
    return this;
  }
}

module.exports = TgSendAnimation;
