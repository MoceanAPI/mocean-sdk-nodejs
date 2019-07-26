const AbstractMocean = require("../AbstractMocean");

class MessageStatus extends AbstractMocean {
  requiredField() {
    return [...super.requiredField(), ...["mocean-msgid"]];
  }

  setMsgid(param) {
    this.params["mocean-msgid"] = param;
    return this;
  }

  inquiry(params = null, callback = null) {
    this.createAndValidate(params);

    return this.transmitter.get("/report/message", this.params, callback);
  }
}

module.exports = MessageStatus;
