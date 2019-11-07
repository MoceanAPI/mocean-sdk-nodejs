const AbstractMc = require("./AbstractMc");

class Sleep extends AbstractMc {
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
