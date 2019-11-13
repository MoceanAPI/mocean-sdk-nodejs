const AbstractMc = require("./AbstractMc");

class Dial extends AbstractMc {
  setTo(param) {
    this.requestData.to = param;
    return this;
  }

  setFrom(param) {
    this.requestData.from = param;
    return this;
  }

  setDialSequentially(param) {
    this.requestData["dial-sequentially"] = param;
    return this;
  }

  requiredKey() {
    return ["to"];
  }

  action() {
    return "dial";
  }
}

module.exports = Dial;
