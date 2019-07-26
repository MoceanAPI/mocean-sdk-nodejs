const AbstractMocean = require("../AbstractMocean");

class Sms extends AbstractMocean {
  constructor(objAuth, options) {
    super(objAuth, options);
    this.flashSms = false;
  }

  requiredField() {
    return [
      ...super.requiredField(),
      ...["mocean-text", "mocean-from", "mocean-to"]
    ];
  }

  setFrom(param) {
    this.params["mocean-from"] = param;
    return this;
  }

  setTo(param) {
    this.params["mocean-to"] = param;
    return this;
  }

  setText(param) {
    this.params["mocean-text"] = param;
    return this;
  }

  setUdh(param) {
    this.params["mocean-udh"] = param;
    return this;
  }

  setCoding(param) {
    this.params["mocean-coding"] = param;
    return this;
  }

  setDlrMask(param) {
    this.params["mocean-dlr-mask"] = param;
    return this;
  }

  setDlrUrl(param) {
    this.params["mocean-dlr-url"] = param;
    return this;
  }

  setSchedule(param) {
    this.params["mocean-schedule"] = param;
    return this;
  }

  setMclass(param) {
    this.params["mocean-mclass"] = param;
    return this;
  }

  setAltDcs(param) {
    this.params["mocean-alt-dcs"] = param;
    return this;
  }

  setCharset(param) {
    this.params["mocean-charset"] = param;
    return this;
  }

  setValidity(param) {
    this.params["mocean-validity"] = param;
    return this;
  }

  addTo(param) {
    if (
      typeof this.params["mocean-to"] !== "undefined" &&
      this.params["mocean-to"] != null
    ) {
      this.params["mocean-to"] += `,${param}`;
    } else {
      this.params["mocean-to"] = param;
    }
    return this;
  }

  send(params = null, callback = null) {
    this.createAndValidate(params);

    if (this.flashSms === true) {
      this.params["mocean-mclass"] = "1";
      this.params["mocean-alt-dcs"] = "1";
    }

    return this.transmitter.post("/sms", this.params, callback);
  }
}

module.exports = Sms;
