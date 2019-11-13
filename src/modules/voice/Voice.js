const AbstractMocean = require("../AbstractMocean");

class Voice extends AbstractMocean {
  constructor(objAuth, options) {
    super(objAuth, options);
    this.isHangup = false;
    this.isRecording = false;
  }

  requiredField() {
    if (this.isHangup || this.isRecording) {
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
    this.createAndValidate({ "mocean-call-uuid": callUuid });

    return this.transmitter.post("/voice/hangup", this.params, callback);
  }

  recording(callUuid, callback = null) {
    this.isRecording = true;
    this.createAndValidate({ "mocean-call-uuid": callUuid });

    return this.transmitter
      .get("/voice/rec", this.params, null)
      .then(recordingBuffer => {
        const res = {
          recordingBuffer,
          filename: `${callUuid}.mp3`
        };

        if (callback !== null) {
          return callback(null, res);
        }

        return res;
      })
      .catch(err => {
        if (callback !== null) {
          return callback(err, null);
        }

        return err;
      });
  }
}

module.exports = Voice;
