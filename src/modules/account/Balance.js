const AbstractMocean = require("../AbstractMocean");

class Balance extends AbstractMocean {
  inquiry(params = null, callback = null) {
    this.createAndValidate(params);

    return this.transmitter.get("/account/balance", this.params, callback);
  }
}

module.exports = Balance;
