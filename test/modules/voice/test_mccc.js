const chai = require("chai");

const { expect } = chai;
const { Mccc } = require("../../../src/index");
const {
  Say,
  Dial,
  Collect,
  Play,
  Record,
  Sleep
} = require("../../../src/modules/voice/Mccc/index");

describe("Mccc Test", () => {
  it("should create a say mccc", () => {
    let say = Mccc.say();
    expect(say).to.be.instanceOf(Say);

    say = Mccc.say("hello world");
    expect(say.get().text).to.eq("hello world");
  });

  it("should create a dial mccc", () => {
    let dial = Mccc.dial();
    expect(dial).to.be.instanceOf(Dial);

    dial = Mccc.dial("testing to");
    expect(dial.get().to).to.eq("testing to");
  });

  it("should create a collect mccc", () => {
    let collect = Mccc.collect();
    collect
      .setMin(1)
      .setMax(10)
      .setTimeout(500);
    expect(collect).to.be.instanceOf(Collect);

    collect = Mccc.collect("testing url");
    collect
      .setMin(1)
      .setMax(10)
      .setTimeout(500);
    expect(collect.get()["event-url"]).to.eq("testing url");
  });

  it("should create a play mccc", () => {
    let play = Mccc.play();
    expect(play).to.be.instanceOf(Play);

    play = Mccc.play("testing file");
    expect(play.get().file).to.eq("testing file");
  });

  it("should create a sleep mccc", () => {
    let sleep = Mccc.sleep();
    expect(sleep).to.be.instanceOf(Sleep);

    sleep = Mccc.sleep(10000);
    expect(sleep.get().duration).to.eq(10000);
  });

  it("should create a record mccc", () => {
    const record = Mccc.record();
    expect(record).to.be.instanceOf(Record);
  });
});
