const chai = require("chai");

const { expect } = chai;
const AbstractMccc = require("../../../../src/modules/voice/Mccc/AbstractMccc");

describe("AbstractMccc Test", () => {
  it("should required children to implement required method", () => {
    const abstractMccc = new AbstractMccc();

    expect(abstractMccc.action).to.throw();
    expect(abstractMccc.requiredKey).to.throw();
  });
});
