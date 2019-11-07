const chai = require("chai");

const { expect } = chai;
const { Play } = require("../../../../src/modules/voice/Mc/index");

describe("Play Test", () => {
  it("should return mc object", () => {
    const params = {
      file: "testing file",
      "barge-in": true,
      "clear-digit-cache": true,
      action: "play"
    };
    let play = new Play(params);

    expect(params).to.deep.eq(play.get());

    play = new Play();
    play.setFiles("testing file");
    play.setBargeIn(true);
    play.setClearDigitCache(true);

    expect(params).to.deep.eq(play.get());
  });

  it("should auto define action", () => {
    const params = {
      file: "testing file",
      "barge-in": true
    };
    const play = new Play(params);

    expect(play.get().action).to.eq("play");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new Play().get();
    }).to.throw();
  });
});
