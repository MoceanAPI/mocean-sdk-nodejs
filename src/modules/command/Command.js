const AbstractMocean = require("../AbstractMocean");
const McBuilder = require("./McBuilder");

class Command extends AbstractMocean {
  requiredField() {
    if (this.isHangup || this.isRecording) {
      return super.requiredField();
    }
    return [...super.requiredField(), ...["mocean-command"]];
  }

  sendAs(channel) {
    this.channel = channel;
  }

  setEventUrl(param) {
    this.params["mocean-event-url"] = param;
    return this;
  }

  setCommand(param) {
    if (param instanceof McBuilder === false) {
      throw Error("Invalid command set.");
    }
    this.params["mocean-command"] = JSON.stringify(param.build());
    return this;
  }

  execute(params = null, callback = null) {
    const uri = "send-message";

    if (params !== null) {
      if (params["mocean-command"] instanceof McBuilder === false) {
        throw Error("Invalid mocean-command set");
      }

      if (typeof params["mocean-command"] !== "undefined") {
        this.setCommand(params["mocean-command"]);
      }

      if (typeof params["mocean-event-url"] !== "undefined") {
        this.setEventUrl(params["mocean-event-url"]);
      }
    }

    this.createAndValidate(this.params);

    return this.transmitter.post(uri, this.params, callback);
  }
}

module.exports = Command;
