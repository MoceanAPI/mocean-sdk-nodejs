const AbstractMocean = require("../AbstractMocean");

class NumberLookup extends AbstractMocean {
  requiredField() {
    return [...super.requiredField(), ...["mocean-to"]];
  }

  setTo(param) {
    this.params["mocean-to"] = param;
    return this;
  }

  setNlUrl(param) {
    this.params["mocean-nl-url"] = param;
    return this;
  }

  inquiry(params = null, callback = null) {
    this.createAndValidate(params);

    return this.transmitter.post("/nl", this.params, callback);
  }
}

module.exports = NumberLookup;
