const chai = require("chai");

const { expect } = chai;
const { CommandSnippet } = require("../../../src/index");
const {
  TgSendAudio,
  TgSendAnimation,
  TgSendDocument,
  TgSendPhoto,
  TgSendVideo,
  TgSendText,
  TgRequestContact,
  SendSMS
} = require("../../../src/modules/command/Mc/index");

describe("Mc Test", () => {
  it("should create a TgSendAudio mc", () => {
    let tgSendAudio = CommandSnippet.TgSendAudio();
    expect(tgSendAudio).to.be.instanceOf(TgSendAudio);
  });

  it("should create a TgSendAnimation mc", () => {
    let tgSendAnimation = CommandSnippet.TgSendAnimation();
    expect(tgSendAnimation).to.be.instanceOf(TgSendAnimation);
  });

  it("should create a TgSendDocument mc", () => {
    let tgSendDocument = CommandSnippet.TgSendDocument();
    expect(tgSendDocument).to.be.instanceOf(TgSendDocument);
  });

  it("should create a TgSendPhoto mc", () => {
    let tgSendPhoto = CommandSnippet.TgSendPhoto();
    expect(tgSendPhoto).to.be.instanceOf(TgSendPhoto);
  });

  it("should create a TgSendVideo mc", () => {
    let tgSendVideo = CommandSnippet.TgSendVideo();
    expect(tgSendVideo).to.be.instanceOf(TgSendVideo);
  });

  it("should create a TgSendText mc", () => {
    let tgSendText = CommandSnippet.TgSendText();
    expect(tgSendText).to.be.instanceOf(TgSendText);
  });

  it("should create a TgRequestContact mc", () => {
    let tgRequestContact = CommandSnippet.TgRequestContact();
    expect(tgRequestContact).to.be.instanceOf(TgRequestContact);
  });

  it("should create a SendSMS mc", () => {
    let sendSMS = CommandSnippet.SendSMS();
    expect(sendSMS).to.be.instanceOf(SendSMS);
  });

});
