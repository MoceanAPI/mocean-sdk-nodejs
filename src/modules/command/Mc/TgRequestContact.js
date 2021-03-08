const AbstractMc = require("./AbstractMc");

class TgRequestContact extends AbstractMc {
  constructor(params = null) {
    super(params);

    if (typeof this.requestData.tg_keyboard === "undefined") {
      this.button("Share contact");
    }
  }

  action() {
    return "send-telegram";
  }

  requiredKey() {
    return ["from", "to", "content", "tg_keyboard"];
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
    this.requestData.content.type = "text";
    this.requestData.content.text = text;
    return this;
  }

  button(text) {
    this.requestData.tg_keyboard = {};
    this.requestData.tg_keyboard.button_request = "contact";
    this.requestData.tg_keyboard.button_text = text;
    return this;
  }
}

module.exports = TgRequestContact;
