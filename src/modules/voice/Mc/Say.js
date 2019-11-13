const AbstractMc = require("./AbstractMc");

class Say extends AbstractMc {
  constructor(params = null) {
    super(params);

    // default value
    this.requestData.language = this.requestData.language
      ? this.requestData.language
      : "en-US";
  }

  setLanguage(param) {
    this.requestData.language = param;
    return this;
  }

  setText(param) {
    this.requestData.text = param;
    return this;
  }

  setBargeIn(param) {
    this.requestData["barge-in"] = param;
    return this;
  }

  setClearDigitCache(param) {
    this.requestData["clear-digit-cache"] = param;
    return this;
  }

  requiredKey() {
    return ["text", "language"];
  }

  action() {
    return "say";
  }
}

module.exports = Say;
