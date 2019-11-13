const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean } = require("../../../src/index");

describe("Verify Request Test", () => {
  const testObj = res => {
    expect(res.status).to.eq("0");
    expect(res.reqid).to.eq("CPASS_restapi_C0000002737000000.0002");
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.verifyRequest = this.mocean.verifyRequest();
  });

  it("should set params through setter", () => {
    expect(this.verifyRequest.params).to.not.has.property("mocean-brand");
    this.verifyRequest.setBrand("test brand");
    expect(this.verifyRequest.params).to.has.property("mocean-brand");
    expect(this.verifyRequest.params["mocean-brand"]).to.eq("test brand");

    expect(this.verifyRequest.params).to.not.has.property("mocean-from");
    this.verifyRequest.setFrom("test from");
    expect(this.verifyRequest.params).to.has.property("mocean-from");
    expect(this.verifyRequest.params["mocean-from"]).to.eq("test from");

    expect(this.verifyRequest.params).to.not.has.property("mocean-to");
    this.verifyRequest.setTo("test to");
    expect(this.verifyRequest.params).to.has.property("mocean-to");
    expect(this.verifyRequest.params["mocean-to"]).to.eq("test to");

    expect(this.verifyRequest.params).to.not.has.property("mocean-code-length");
    this.verifyRequest.setCodeLength("test code length");
    expect(this.verifyRequest.params).to.has.property("mocean-code-length");
    expect(this.verifyRequest.params["mocean-code-length"]).to.eq(
      "test code length"
    );

    expect(this.verifyRequest.params).to.not.has.property(
      "mocean-pin-validity"
    );
    this.verifyRequest.setPinValidity("test pin validity");
    expect(this.verifyRequest.params).to.has.property("mocean-pin-validity");
    expect(this.verifyRequest.params["mocean-pin-validity"]).to.eq(
      "test pin validity"
    );

    expect(this.verifyRequest.params).to.not.has.property(
      "mocean-next-event-wait"
    );
    this.verifyRequest.setNextEventWait("test next event wait");
    expect(this.verifyRequest.params).to.has.property("mocean-next-event-wait");
    expect(this.verifyRequest.params["mocean-next-event-wait"]).to.eq(
      "test next event wait"
    );

    expect(this.verifyRequest.params).to.not.has.property("mocean-reqid");
    this.verifyRequest.setReqId("test req id");
    expect(this.verifyRequest.params).to.has.property("mocean-reqid");
    expect(this.verifyRequest.params["mocean-reqid"]).to.eq("test req id");
  });

  it("should send as sms channel", () => {
    TestingUtils.makeMockRequest("/verify/req/sms", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to",
          "mocean-brand": "test brand"
        });
        return TestingUtils.fileResponse("send_code.json");
      }
    );

    this.verifyRequest.sendAs("sms");
    expect(this.verifyRequest.channel).to.equal("sms");

    this.verifyRequest.setTo("test to");
    this.verifyRequest.setBrand("test brand");
    return this.verifyRequest.send();
  });

  it("should resend verify request when requested", () => {
    TestingUtils.makeMockRequest("/verify/resend/sms", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-reqid": "test req id"
        });
        return TestingUtils.fileResponse("resend_code.json");
      }
    );

    this.verifyRequest = this.mocean.verifyRequest(true);

    this.verifyRequest.setReqId("test req id");
    return this.verifyRequest.resend();
  });

  it("should throw error when required field not set", () => {
    TestingUtils.makeMockRequest("/verify/req", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to",
          "mocean-brand": "test brand"
        });
        return TestingUtils.fileResponse("send_code.json");
      }
    );

    const sendCall = () => {
      this.verifyRequest.send();
      return true;
    };

    expect(this.verifyRequest.params).to.not.has.property("mocean-to");
    expect(sendCall).to.throw();
    this.verifyRequest.setTo("test to");

    expect(this.verifyRequest.params).to.not.has.property("mocean-brand");
    expect(sendCall).to.throw();
    this.verifyRequest.setBrand("test brand");

    expect(sendCall()).to.be.true;
  });

  it("should return callback on send", () => {
    TestingUtils.makeMockRequest("/verify/req", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to",
          "mocean-brand": "test brand"
        });
        return TestingUtils.fileResponse("send_code.json");
      }
    );

    this.verifyRequest.setTo("test to");
    this.verifyRequest.setBrand("test brand");
    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.calledOnce;
        return resolve();
      });
      this.verifyRequest.send(null, fake);
    });
  });

  it("should return promise on send", () => {
    TestingUtils.makeMockRequest("/verify/req", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-to": "test to",
          "mocean-brand": "test brand"
        });
        return TestingUtils.fileResponse("send_code.json");
      }
    );

    this.verifyRequest.setTo("test to");
    this.verifyRequest.setBrand("test brand");
    return this.verifyRequest.send().then(res => {
      testObj(res);
    });
  });
});
