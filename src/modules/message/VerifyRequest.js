const AbstractMocean = require("../AbstractMocean");

class VerifyRequest extends AbstractMocean {
  constructor(objAuth, options) {
    super(objAuth, options);
    this.channel = "auto";
    this.isResend = false;
  }

  requiredField() {
    if (this.isResend) {
      return [...super.requiredField(), ...["mocean-reqid"]];
    }

    return [...super.requiredField(), ...["mocean-to", "mocean-brand"]];
  }

  setBrand(param) {
    this.params["mocean-brand"] = param;
    return this;
  }

  setFrom(param) {
    this.params["mocean-from"] = param;
    return this;
  }

  setTo(param) {
    this.params["mocean-to"] = param;
    return this;
  }

  setCodeLength(param) {
    this.params["mocean-code-length"] = param;
    return this;
  }

  setPinValidity(param) {
    this.params["mocean-pin-validity"] = param;
    return this;
  }

  setNextEventWait(param) {
    this.params["mocean-next-event-wait"] = param;
    return this;
  }

  setReqId(param) {
    this.params["mocean-reqid"] = param;
    return this;
  }

  sendAs(channel = "auto") {
    this.channel = channel;
    return this;
  }

  resend(params = null, callback = null) {
    this.sendAs("sms");
    this.isResend = true;

    return this.send(params, callback);
  }

  send(params = null, callback = null) {
    this.createAndValidate(params);

    let verifyRequestUrl = "/verify";
    if (this.isResend) {
      verifyRequestUrl += "/resend";
    } else {
      verifyRequestUrl += "/req";
    }

    if (this.channel.toLowerCase() === "sms") {
      verifyRequestUrl += "/sms";
    } else if (this.channel.toLocaleLowerCase() === "telegram") {
      verifyRequestUrl += "/telegram";
    }

    return this.transmitter.post(verifyRequestUrl, this.params, callback);
  }
}

module.exports = VerifyRequest;
