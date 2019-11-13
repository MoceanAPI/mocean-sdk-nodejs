const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean, Mc, McBuilder } = require("../../../src/index");

describe("Voice Test", () => {
  const testObj = res => {
    expect(res.calls).to.be.an("array");
    expect(res.calls).to.have.lengthOf(1);
    expect(res.calls[0].status).to.eq(0);
    expect(res.calls[0].receiver).to.eq("60123456789");
    expect(res.calls[0]["session-uuid"]).to.eq("xxx-xxx-xxx-xxx");
    expect(res.calls[0]["call-uuid"]).to.eq("xxx-xxx-xxx-xxx");
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

    expect(this.voice.params).to.not.has.property("mocean-event-url");
    this.voice.setEventUrl("test event url");
    expect(this.voice.params).to.has.property("mocean-event-url");
    expect(this.voice.params["mocean-event-url"]).to.eq("test event url");

    expect(this.voice.params).to.not.has.property("mocean-command");
    this.voice.setMoceanCommand("test mocean command");
    expect(this.voice.params).to.has.property("mocean-command");
    expect(this.voice.params["mocean-command"]).to.eq("test mocean command");
  });

  it("should throw error when required field not set", () => {
    TestingUtils.makeMockRequest("/voice/dial", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to"
        });
        return TestingUtils.fileResponse("voice.json");
      }
    );

    const voiceCall = () => {
      this.voice.call();
      return true;
    };

    expect(this.voice.params).to.not.has.property("mocean-to");
    expect(voiceCall).to.throw();
    this.voice.setTo("test to");

    expect(voiceCall()).to.be.true;
  });

  it("should accept mcBuilder as mc parameter", () => {
    TestingUtils.makeMockRequest("/voice/dial", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to",
          "mocean-command": JSON.stringify(
            new McBuilder().add(Mc.play("hello world")).build()
          )
        });
        return TestingUtils.fileResponse("voice.json");
      }
    );

    const mcBuilder = new McBuilder().add(Mc.play("hello world"));

    return this.voice
      .setTo("test to")
      .setMoceanCommand(mcBuilder)
      .call()
      .then(result => {
        expect(result).to.not.eq(null);
      });
  });

  it("should return callback on call", () => {
    TestingUtils.makeMockRequest("/voice/dial", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to"
        });
        return TestingUtils.fileResponse("voice.json");
      }
    );

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
    TestingUtils.makeMockRequest("/voice/dial", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to"
        });
        return TestingUtils.fileResponse("voice.json");
      }
    );

    this.voice.setTo("test to");
    return this.voice.call().then(res => {
      testObj(res);
    });
  });

  it("should be able to call hangup", () => {
    TestingUtils.makeMockRequest("/voice/hangup", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-call-uuid": "xxx-xxx-xxx-xxx"
        });
        return TestingUtils.fileResponse("hangup.json");
      }
    );

    // TestingUtils.makeMockRequest("hangup.json", "/voice/hangup", "post");

    return this.voice.hangup("xxx-xxx-xxx-xxx").then(res => {
      expect(res.status).to.eq(0);
    });
  });
});
