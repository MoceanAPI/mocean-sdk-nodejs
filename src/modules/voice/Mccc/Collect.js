const AbstractMccc = require("./AbstractMccc");

class Collect extends AbstractMccc {
  constructor(params = null) {
    super(params);

    // default value
    this.requestData.min = this.requestData.min ? this.requestData.min : 1;
    this.requestData.max = this.requestData.max ? this.requestData.max : 10;
    this.requestData.terminators = this.requestData.terminators
      ? this.requestData.terminators
      : "#";
    this.requestData.timeout = this.requestData.timeout
      ? this.requestData.timeout
      : 5000;
  }

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
    return ["event-url", "min", "max", "terminators", "timeout"];
  }

  action() {
    return "collect";
  }
}

module.exports = Collect;
