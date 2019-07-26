const chai = require("chai");

const { expect } = chai;
const { Play } = require("../../../../src/modules/voice/Mccc/index");

describe("Play Test", () => {
  it("should return mccc object", () => {
    const params = {
      file: "testing file",
      "barge-in": true,
      action: "play"
    };
    let play = new Play(params);

    expect(params).to.deep.eq(play.get());

    play = new Play();
    play.setFiles("testing file");
    play.setBargeIn(true);

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
