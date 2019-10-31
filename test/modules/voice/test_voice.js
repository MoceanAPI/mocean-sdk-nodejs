const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean, Mccc, McccBuilder } = require("../../../src/index");

describe("Voice Test", () => {
  const testObj = res => {
    expect(res.status).to.eq(0);
    expect(res["session-uuid"]).to.eq("xxx-xxx-xxx-xxx");
    expect(res["call-uuid"]).to.eq("xxx-xxx-xxx-xxx");
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.voice = this.mocean.voice();
  });

  it("should set params through setter", () => {
    expect(this.voice.params).to.not.has.property("mocean-to");
    this.voice.setTo("test to");
    expect(this.voice.params).to.has.property("mocean-to");
    expect(this.voice.params["mocean-to"]).to.eq("test to");

    expect(this.voice.params).to.not.has.property("mocean-call-event-url");
    this.voice.setCallEventUrl("test call event url");
    expect(this.voice.params).to.has.property("mocean-call-event-url");
    expect(this.voice.params["mocean-call-event-url"]).to.eq(
      "test call event url"
    );

    expect(this.voice.params).to.not.has.property(
      "mocean-call-control-commands"
    );
    this.voice.setCallControlCommands("test call control commands");
    expect(this.voice.params).to.has.property("mocean-call-control-commands");
    expect(this.voice.params["mocean-call-control-commands"]).to.eq(
      "test call control commands"
    );
  });

  it("should throw error when required field not set", () => {
    TestingUtils.makeMockRequest("voice.json", "/voice/dial", "get");

    const voiceCall = () => {
      this.voice.call();
      return true;
    };

    expect(this.voice.params).to.not.has.property("mocean-to");
    expect(voiceCall).to.throw();
    this.voice.setTo("test to");

    expect(voiceCall()).to.be.true;
  });

  it("should accept mcccBuilder as mccc parameter", () => {
    TestingUtils.makeMockRequest("voice.json", "/voice/dial", "post");

    const mcccBuilder = new McccBuilder().add(Mccc.play("hello world"));

    return this.voice
      .setTo("test to")
      .setCallControlCommands(mcccBuilder)
      .call()
      .then(result => {
        expect(result).to.not.eq(null);
      });
  });

  it("should return callback on call", () => {
    TestingUtils.makeMockRequest("voice.json", "/voice/dial", "post");

    this.voice.setTo("test to");
    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.voice.call(null, fake);
    });
  });

  it("should return promise on call", () => {
    TestingUtils.makeMockRequest("voice.json", "/voice/dial", "post");

    this.voice.setTo("test to");
    return this.voice.call().then(res => {
      testObj(res);
    });
  });
});
