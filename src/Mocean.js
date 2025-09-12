const Client = require("./Client");

class Mocean {
  constructor(client, options = {}) {
    if (!(client instanceof Client)) {
      throw Error("Object pass into Mocean must be Client");
    }
    if (
      (!client.params["mocean-api-key"] ||
      !client.params["mocean-api-secret"]) && 
      !client.params["mocean-api-token"]
    ) {
      throw Error("api key and api secret or api token can't be empty");
    }
    this.obj_auth = client;
    this.options = options;
  }

  sms() {
    const Sms = require("./modules/message/Sms");
    return new Sms(this.obj_auth, this.options);
  }

  flashSms() {
    const Sms = require("./modules/message/Sms");
    const sms = new Sms(this.obj_auth, this.options);
    sms.flashSms = true;
    return sms;
  }

  balance() {
    const Balance = require("./modules/account/Balance");
    return new Balance(this.obj_auth, this.options);
  }

  pricingList() {
    const Pricing = require("./modules/account/Pricing");
    return new Pricing(this.obj_auth, this.options);
  }

  messageStatus() {
    const MessageStatus = require("./modules/message/MessageStatus");
    return new MessageStatus(this.obj_auth, this.options);
  }

  verifyRequest(resend = false) {
    const VerifyRequest = require("./modules/message/VerifyRequest");
    return new VerifyRequest(this.obj_auth, this.options, resend);
  }

  verifyValidate() {
    const VerifyValidate = require("./modules/message/VerifyValidate");
    return new VerifyValidate(this.obj_auth, this.options);
  }

  numberLookup() {
    const NumberLookup = require("./modules/number_lookup/NumberLookup");
    return new NumberLookup(this.obj_auth, this.options);
  }

  voice() {
    const Voice = require("./modules/voice/Voice");
    return new Voice(this.obj_auth, this.options);
  }

  command() {
    const Command = require("./modules/command/Command");
    return new Command(this.obj_auth, this.options);
  }
}

module.exports = Mocean;
