const AbstractMc = require("./Mc/AbstractMc");

class McBuilder {
  constructor() {
    this.mc = [];
  }

  add(mc) {
    if (mc instanceof AbstractMc) {
      this.mc.push(mc);
      return this;
    }

    throw Error("invalid mocean command");
  }

  build() {
    const converted = [];
    this.mc.forEach(mcObj => {
      converted.push(mcObj.get());
    });
    return converted;
  }
}

module.exports = McBuilder;
