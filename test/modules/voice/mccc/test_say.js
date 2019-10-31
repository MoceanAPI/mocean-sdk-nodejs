const chai = require("chai");

const { expect } = chai;
const { Say } = require("../../../../src/modules/voice/Mccc/index");

describe("Say Test", () => {
  it("should return mccc object", () => {
    const params = {
      language: "testing language",
      text: "testing text",
      "barge-in": true,
      "clear-digit-cache": true,
      action: "say"
    };
    let say = new Say(params);

    expect(params).to.deep.eq(say.get());

    say = new Say();
    say.setLanguage("testing language");
    say.setText("testing text");
    say.setBargeIn(true);
    say.setClearDigitCache(true);

    expect(params).to.deep.eq(say.get());
  });

  it("should auto define action", () => {
    const params = {
      language: "testing language",
      text: "testing text",
      "barge-in": true
    };
    const say = new Say(params);

    expect(say.get().action).to.eq("say");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new Say().get();
    }).to.throw();
  });
});
