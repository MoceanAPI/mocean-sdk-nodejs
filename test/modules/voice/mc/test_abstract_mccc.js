const chai = require("chai");

const { expect } = chai;
const AbstractMc = require("../../../../src/modules/voice/Mc/AbstractMc");

describe("AbstractMc Test", () => {
  it("should required children to implement required method", () => {
    const abstractMc = new AbstractMc();

    expect(abstractMc.action).to.throw();
    expect(abstractMc.requiredKey).to.throw();
  });
});
