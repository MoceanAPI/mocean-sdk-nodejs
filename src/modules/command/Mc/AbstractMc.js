class AbstractMc {
  constructor(params = null) {
    this.requestData = {};

    if (params !== null) {
      this.requestData = Object.assign({}, params);
    }
  }

  get() {
    this.requiredKey().forEach(requiredKey => {
      if (typeof this.requestData[requiredKey] === "undefined") {
        throw Error(`${requiredKey} is mandatory field.`);
      }
    });

    this.requestData.action = this.action();
    return this.requestData;
  }

  action() {
    throw new Error("action is not implemented");
  }

  requiredKey() {
    throw new Error("requiredKey is not implemented");
  }
}

module.exports = AbstractMc;
