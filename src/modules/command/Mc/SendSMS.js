const AbstractMc = require("./AbstractMc");

class SendSMS extends AbstractMc {
  action() {
    return "send-sms";
  }

  requiredKey() {
    return ["from", "to", "content"];
  }

  from(from, contactType = "phone_num") {
    this.requestData.from = {};
    this.requestData.from.id = from;
    this.requestData.from.type = contactType;
    return this;
  }

  to(to, contactType = "phone_num") {
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

module.exports = SendSMS;
