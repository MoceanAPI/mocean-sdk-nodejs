const AbstractMccc = require("./AbstractMccc");

class Bridge extends AbstractMccc {
  constructor(params = null) {
    super(params);
  }

  setTo(param) {
    this.requestData.to = param;
    return this;
  }

  requiredKey() {
    return ["to"];
  }

  action() {
    return "dial";
  }
}

module.exports = Bridge;
