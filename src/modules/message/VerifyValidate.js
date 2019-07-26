const AbstractMocean = require("../AbstractMocean");

class VerifyValidate extends AbstractMocean {
  requiredField() {
    return [...super.requiredField(), ...["mocean-reqid", "mocean-code"]];
  }

  setReqid(param) {
    this.params["mocean-reqid"] = param;
    return this;
  }

  setCode(param) {
    this.params["mocean-code"] = param;
    return this;
  }

  send(params = null, callback = null) {
    this.createAndValidate(params);

    return this.transmitter.post("/verify/check", this.params, callback);
  }
}

module.exports = VerifyValidate;
