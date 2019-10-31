const AbstractMccc = require("./AbstractMccc");

class Sleep extends AbstractMccc {
  setDuration(param) {
    this.requestData.duration = param;
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
