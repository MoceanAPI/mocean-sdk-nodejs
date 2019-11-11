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
    TestingUtils.makeMockRequest("recording.json", "/voice/rec", "get");

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

  it("should return promise on call", () => {
    TestingUtils.makeMockRequest("recording.json", "/voice/rec", "get");

    return this.voice.recording("xxx-xxx-xxx-xxx").then(res => {
      testObj(res);
    });
  });
});
