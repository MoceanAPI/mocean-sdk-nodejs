const chai = require("chai");

const { expect } = chai;
const { Dial } = require("../../../../src/modules/voice/Mccc/index");

describe("Dial Test", () => {
  it("should return mccc object", () => {
    const params = {
      to: "testing to",
      action: "dial",
      from: "callerid",
      "dial-sequentially": true
    };
    let dial = new Dial(params);

    expect(params).to.deep.eq(dial.get());

    dial = new Dial();
    dial
      .setTo("testing to")
      .setFrom("callerid")
      .setDialSequentially(true);

    expect(params).to.deep.eq(dial.get());
  });

  it("should auto define action", () => {
    const params = {
      to: "testing to"
    };
    const dial = new Dial(params);

    expect(dial.get().action).to.eq("dial");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new Dial().get();
    }).to.throw();
  });
});
