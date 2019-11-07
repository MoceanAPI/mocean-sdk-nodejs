const AbstractMc = require("./AbstractMc");

class Play extends AbstractMc {
  setFiles(param) {
    this.requestData.file = param;
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
    return ["file"];
  }

  action() {
    return "play";
  }
}

module.exports = Play;
