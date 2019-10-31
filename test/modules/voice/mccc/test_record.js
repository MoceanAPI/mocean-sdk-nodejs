const chai = require("chai");

const { expect } = chai;
const { Record } = require("../../../../src/modules/voice/Mccc/index");

describe("Record Test", () => {
  it("should auto define action", () => {
    const record = new Record();

    expect(record.get().action).to.eq("record");
  });
});
