const {
  TgRequestContact,
  TgSendAnimation,
  TgSendAudio,
  TgSendDocument,
  TgSendPhoto,
  TgSendText,
  TgSendVideo,
  SendSMS
} = require("./Mc/index");

class Mc {
  static TgRequestContact() {
    return new TgRequestContact();
  }

  static TgSendAnimation() {
    return new TgSendAnimation();
  }

  static TgSendAudio() {
    return new TgSendAudio();
  }

  static TgSendDocument() {
    return new TgSendDocument();
  }

  static TgSendPhoto() {
    return new TgSendPhoto();
  }

  static TgSendText() {
    return new TgSendText();
  }

  static TgSendVideo() {
    return new TgSendVideo();
  }

  static SendSMS() {
    return new SendSMS();
  }
}

module.exports = Mc;
