const AbstractMc = require("./AbstractMc");

class TgSendText extends AbstractMc {
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

  content(text) {
    this.requestData.content = {};
    this.requestData.content.text = text;
    this.requestData.content.type = "text";
    return this;
  }
}

module.exports = TgSendText;
