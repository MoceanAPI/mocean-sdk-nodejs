const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean } = require("../../../src/index");

describe("Recording Test", () => {
  const testObj = res => {
    expect(res.recordingBuffer).not.equal(null);
    expect(res.filename).to.eq("xxx-xxx-xxx-xxx.mp3");
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.voice = this.mocean.voice();
  });

  it("should return callback on call", () => {
    TestingUtils.makeMockRequest("/voice/rec", "GET").reply(uri => {
      TestingUtils.verifyParamsWith(uri.split("?")[1], {
        "mocean-call-uuid": "xxx-xxx-xxx-xxx"
      });
      return TestingUtils.fileResponse("recording.json");
    });

    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.voice.recording("xxx-xxx-xxx-xxx", fake);
    });
  });

  it("should throw error callback", () => {
    TestingUtils.makeMockRequest("/voice/rec", "GET").replyWithError(
      "unknown error"
    );

    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (res) {
          return reject(new Error("expect to be error but response received"));
        }

        expect(fake).has.been.called;
        return resolve();
      });
      this.voice.recording("xxx-xxx-xxx-xxx", fake);
    });
  });

  it("should throw error promise", () => {
    TestingUtils.makeMockRequest("/voice/rec", "GET").replyWithError(
      "unknown error"
    );

    return this.voice
      .recording("xxx-xxx-xxx-xxx")
      .then(() =>
        Promise.reject(new Error("expect to be error but response received"))
      )
      .catch(() => Promise.resolve());
  });

  it("should return promise on call", () => {
    TestingUtils.makeMockRequest("/voice/rec", "GET").reply(uri => {
      TestingUtils.verifyParamsWith(uri.split("?")[1], {
        "mocean-call-uuid": "xxx-xxx-xxx-xxx"
      });
      return TestingUtils.fileResponse("recording.json");
    });

    return this.voice.recording("xxx-xxx-xxx-xxx").then(res => {
      testObj(res);
    });
  });

  it("should return undecoded body when content type is audio/mpeg", () => {
    TestingUtils.makeMockRequest("/voice/rec", "GET").reply(uri => {
      TestingUtils.verifyParamsWith(uri.split("?")[1], {
        "mocean-call-uuid": "xxx-xxx-xxx-xxx"
      });
      return [200, "mock binary", { "content-type": "audio/mpeg" }];
    });

    return this.voice.recording("xxx-xxx-xxx-xxx").then(res => {
      expect(res).not.equal(null);
    });
  });
});
