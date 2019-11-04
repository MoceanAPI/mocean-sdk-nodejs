const AbstractMocean = require("../AbstractMocean");

class Voice extends AbstractMocean {
  constructor(objAuth, options) {
    super(objAuth, options);
    this.isHangup = false;
  }

  requiredField() {
    if (this.isHangup) {
      return super.requiredField();
      L;
    }

    return [...super.requiredField(), ...["mocean-to"]];
  }

  setTo(param) {
    this.params["mocean-to"] = param;
    return this;
  }

  setCallEventUrl(param) {
    this.params["mocean-call-event-url"] = param;
    return this;
  }

  setCallControlCommands(param) {
    this.params["mocean-call-control-commands"] = param;
    return this;
  }

  call(params = null, callback = null) {
    this.createAndValidate(params);

    if (
      this.params["mocean-call-control-commands"] &&
      typeof this.params["mocean-call-control-commands"].build === "function"
    ) {
      this.params["mocean-call-control-commands"] = this.params[
        "mocean-call-control-commands"
      ].build();
    }
    if (this.params["mocean-call-control-commands"]) {
      this.params["mocean-call-control-commands"] = JSON.stringify(
        this.params["mocean-call-control-commands"]
      );
    }

    return this.transmitter.post("/voice/dial", this.params, callback);
  }

  hangup(callUuid, callback = null) {
    this.isHangup = true;
    this.createAndValidate({});

    return this.transmitter.post(`/voice/hangup/${callUuid}`, this.params, callback);
  }
}

module.exports = Voice;
