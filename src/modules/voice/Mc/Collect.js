const AbstractMc = require("./AbstractMc");

class Collect extends AbstractMc {
  setEventUrl(param) {
    this.requestData["event-url"] = param;
    return this;
  }

  setMin(param) {
    this.requestData.min = param;
    return this;
  }

  setMax(param) {
    this.requestData.max = param;
    return this;
  }

  setTerminators(param) {
    this.requestData.terminators = param;
    return this;
  }

  setTimeout(param) {
    this.requestData.timeout = param;
  }

  requiredKey() {
    return ["event-url", "min", "max", "timeout"];
  }

  action() {
    return "collect";
  }
}

module.exports = Collect;
