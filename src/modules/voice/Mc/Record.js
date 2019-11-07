const AbstractMc = require("./AbstractMc");

class Record extends AbstractMc {
  requiredKey() {
    return [];
  }

  action() {
    return "record";
  }
}

module.exports = Record;
