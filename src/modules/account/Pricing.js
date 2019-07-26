const AbstractMocean = require("../AbstractMocean");

class Pricing extends AbstractMocean {
  setMcc(param) {
    this.params["mocean-mcc"] = param;
    return this;
  }

  setMnc(param) {
    this.params["mocean-mnc"] = param;
    return this;
  }

  setDelimiter(param) {
    this.params["mocean-delimiter"] = param;
    return this;
  }

  inquiry(params = null, callback = null) {
    this.createAndValidate(params);

    return this.transmitter.get("/account/pricing", this.params, callback);
  }
}

module.exports = Pricing;
