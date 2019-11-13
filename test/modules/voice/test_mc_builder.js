const chai = require("chai");

const { expect } = chai;
const { McBuilder, Mc } = require("../../../src/index");

describe("McBuilder Test", () => {
  it("should able to add multiple mc object", () => {
    const play = Mc.play("testing file");

    const builder = new McBuilder();
    builder.add(play);
    expect(builder.build()).to.have.lengthOf(1);
    expect(builder.build()[0]).to.eq(play.get());

    play.setFiles("testing file2");
    builder.add(play);
    expect(builder.build()).to.have.lengthOf(2);
    expect(builder.build()[1]).to.eq(play.get());
  });

  it("should throw if add non mc object", () => {
    expect(() => {
      new McBuilder().add("test");
    }).to.throw();
  });
});
