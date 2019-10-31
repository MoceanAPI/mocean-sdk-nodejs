const AbstractMccc = require("./AbstractMccc");

class Record extends AbstractMccc {
  requiredKey() {
    return [];
  }

  action() {
    return "record";
  }
}

module.exports = Record;
