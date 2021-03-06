const chai = require("chai");

const { expect } = chai;
const { Sleep } = require("../../../../src/modules/voice/Mc/index");

describe("Sleep Test", () => {
  it("should return mc object", () => {
    const params = {
      duration: 10000,
      action: "sleep"
    };
    let sleep = new Sleep(params);

    expect(params).to.deep.eq(sleep.get());

    sleep = new Sleep();
    sleep.setDuration(10000);

    expect(params).to.deep.eq(sleep.get());
  });

  it("should auto define action", () => {
    const params = {
      duration: 10000,
      "barge-in": true
    };
    const sleep = new Sleep(params);

    expect(sleep.get().action).to.eq("sleep");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new Sleep().get();
    }).to.throw();
  });
});
