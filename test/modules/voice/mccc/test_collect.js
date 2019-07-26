const chai = require("chai");

const { expect } = chai;
const { Collect } = require("../../../../src/modules/voice/Mccc/index");

describe("Collect Test", () => {
  it("should return mccc object", () => {
    const params = {
      "event-url": "testing event url",
      min: 1,
      max: 10,
      terminators: "#",
      timeout: 10000,
      action: "collect"
    };
    let collect = new Collect(params);

    expect(params).to.deep.eq(collect.get());

    collect = new Collect();
    collect.setEventUrl("testing event url");
    collect.setMin(1);
    collect.setMax(10);
    collect.setTerminators("#");
    collect.setTimeout(10000);

    expect(params).to.deep.eq(collect.get());
  });

  it("should auto define action", () => {
    const params = {
      "event-url": "testing event url",
      min: 1,
      max: 10,
      terminators: "#",
      timeout: 10000
    };
    const collect = new Collect(params);

    expect(collect.get().action).to.eq("collect");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new Collect().get();
    }).to.throw();
  });
});
