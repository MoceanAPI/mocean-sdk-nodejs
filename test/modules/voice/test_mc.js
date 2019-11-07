const chai = require("chai");

const { expect } = chai;
const { Mc } = require("../../../src/index");
const {
  Say,
  Dial,
  Collect,
  Play,
  Record,
  Sleep
} = require("../../../src/modules/voice/Mc/index");

describe("Mc Test", () => {
  it("should create a say mc", () => {
    let say = Mc.say();
    expect(say).to.be.instanceOf(Say);

    say = Mc.say("hello world");
    expect(say.get().text).to.eq("hello world");
  });

  it("should create a dial mc", () => {
    let dial = Mc.dial();
    expect(dial).to.be.instanceOf(Dial);

    dial = Mc.dial("testing to");
    expect(dial.get().to).to.eq("testing to");
  });

  it("should create a collect mc", () => {
    let collect = Mc.collect();
    collect
      .setMin(1)
      .setMax(10)
      .setTimeout(500);
    expect(collect).to.be.instanceOf(Collect);

    collect = Mc.collect("testing url");
    collect
      .setMin(1)
      .setMax(10)
      .setTimeout(500);
    expect(collect.get()["event-url"]).to.eq("testing url");
  });

  it("should create a play mc", () => {
    let play = Mc.play();
    expect(play).to.be.instanceOf(Play);

    play = Mc.play("testing file");
    expect(play.get().file).to.eq("testing file");
  });

  it("should create a sleep mc", () => {
    let sleep = Mc.sleep();
    expect(sleep).to.be.instanceOf(Sleep);

    sleep = Mc.sleep(10000);
    expect(sleep.get().duration).to.eq(10000);
  });

  it("should create a record mc", () => {
    const record = Mc.record();
    expect(record).to.be.instanceOf(Record);
  });
});
