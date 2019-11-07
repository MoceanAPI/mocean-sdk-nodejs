const AbstractMocean = require("../AbstractMocean");

class Voice extends AbstractMocean {
  constructor(objAuth, options) {
    super(objAuth, options);
    this.isHangup = false;
  }

  requiredField() {
    if (this.isHangup) {
      return super.requiredField();
    }

    return [...super.requiredField(), ...["mocean-to"]];
  }

  setTo(param) {
    this.params["mocean-to"] = param;
    return this;
  }

  setEventUrl(param) {
    this.params["mocean-event-url"] = param;
    return this;
  }

  setMoceanCommand(param) {
    this.params["mocean-command"] = param;
    return this;
  }

  call(params = null, callback = null) {
    this.createAndValidate(params);

    if (
      this.params["mocean-command"] &&
      typeof this.params["mocean-command"].build === "function"
    ) {
      this.params["mocean-command"] = this.params["mocean-command"].build();
    }
    if (this.params["mocean-command"]) {
      this.params["mocean-command"] = JSON.stringify(
        this.params["mocean-command"]
      );
    }

    return this.transmitter.post("/voice/dial", this.params, callback);
  }

  hangup(callUuid, callback = null) {
    this.isHangup = true;
    this.createAndValidate({});

    return this.transmitter.post(
      `/voice/hangup/${callUuid}`,
      this.params,
      callback
    );
  }
}

module.exports = Voice;
