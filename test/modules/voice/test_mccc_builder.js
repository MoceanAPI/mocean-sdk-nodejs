const chai = require("chai");

const { expect } = chai;
const { McccBuilder, Mccc } = require("../../../src/index");

describe("McccBuilder Test", () => {
  it("should able to add multiple mccc object", () => {
    const play = Mccc.play("testing file");

    const builder = new McccBuilder();
    builder.add(play);
    expect(builder.build()).to.have.lengthOf(1);
    expect(builder.build()[0]).to.eq(play.get());

    play.setFiles("testing file2");
    builder.add(play);
    expect(builder.build()).to.have.lengthOf(2);
    expect(builder.build()[1]).to.eq(play.get());
  });

  it("should throw if add non mccc object", () => {
    expect(() => {
      new McccBuilder().add("test");
    }).to.throw();
  });
});
