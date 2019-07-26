const AbstractMccc = require("./AbstractMccc");

class Sleep extends AbstractMccc {
  constructor(params = null) {
    super(params);
  }

  setDuration(param) {
    this.requestData.duration = param;
    return this;
  }

  setBargeIn(param) {
    this.requestData["barge-in"] = param;
    return this;
  }

  requiredKey() {
    return ["duration"];
  }

  action() {
    return "sleep";
  }
}

module.exports = Sleep;
