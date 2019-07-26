const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean } = require("../../../src/index");

describe("Verify Validate Test", () => {
  const testObj = res => {
    expect(res.status).to.eq("0");
    expect(res.reqid).to.eq("CPASS_restapi_C0000002737000000.0002");
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.verifyValidate = this.mocean.verifyValidate();
  });

  it("should set params through setter", () => {
    expect(this.verifyValidate.params).to.not.has.property("mocean-reqid");
    this.verifyValidate.setReqid("test req id");
    expect(this.verifyValidate.params).to.has.property("mocean-reqid");
    expect(this.verifyValidate.params["mocean-reqid"]).to.eq("test req id");

    expect(this.verifyValidate.params).to.not.has.property("mocean-code");
    this.verifyValidate.setCode("test code");
    expect(this.verifyValidate.params).to.has.property("mocean-code");
    expect(this.verifyValidate.params["mocean-code"]).to.eq("test code");
  });

  it("should throw error when required field not set", () => {
    TestingUtils.makeMockRequest("verify_code.json", "/verify/check", "post");

    const sendCall = () => {
      this.verifyValidate.send();
      return true;
    };

    expect(this.verifyValidate.params).to.not.has.property("mocean-reqid");
    expect(sendCall).to.throw();
    this.verifyValidate.setReqid("test req id");

    expect(this.verifyValidate.params).to.not.has.property("mocean-code");
    expect(sendCall).to.throw();
    this.verifyValidate.setCode("test code");

    expect(sendCall()).to.be.true;
  });

  it("should return callback on send", () => {
    TestingUtils.makeMockRequest("verify_code.json", "/verify/check", "post");

    this.verifyValidate.setReqid("test req id");
    this.verifyValidate.setCode("test code");
    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.verifyValidate.send(null, fake);
    });
  });

  it("should return promise on send", () => {
    TestingUtils.makeMockRequest("verify_code.json", "/verify/check", "post");

    this.verifyValidate.setReqid("test req id");
    this.verifyValidate.setCode("test code");
    return this.verifyValidate.send().then(res => {
      testObj(res);
    });
  });
});
