const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean } = require("../../../src/index");

describe("Number Lookup Test", () => {
  const testObj = res => {
    expect(res.status).to.eq(0);
    expect(res.msgid).to.eq("CPASS_restapi_C00000000000000.0002");
    expect(res.to).to.eq("60123456789");
    expect(res.current_carrier.country).to.eq("MY");
    expect(res.current_carrier.name).to.eq("U Mobile");
    expect(res.current_carrier.network_code).to.eq(50218);
    expect(res.current_carrier.mcc).to.eq("502");
    expect(res.current_carrier.mnc).to.eq("18");
    expect(res.original_carrier.country).to.eq("MY");
    expect(res.original_carrier.name).to.eq("Maxis Mobile");
    expect(res.original_carrier.network_code).to.eq(50212);
    expect(res.original_carrier.mcc).to.eq("502");
    expect(res.original_carrier.mnc).to.eq("12");
    expect(res.ported).to.eq("ported");
    expect(res.reachable).to.eq("reachable");
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.numberLookup = this.mocean.numberLookup();
  });

  it("should set params through setter", () => {
    expect(this.numberLookup.params).to.not.has.property("mocean-to");
    this.numberLookup.setTo("test to");
    expect(this.numberLookup.params).to.has.property("mocean-to");
    expect(this.numberLookup.params["mocean-to"]).to.eq("test to");

    expect(this.numberLookup.params).to.not.has.property("mocean-nl-url");
    this.numberLookup.setNlUrl("test nl url");
    expect(this.numberLookup.params).to.has.property("mocean-nl-url");
    expect(this.numberLookup.params["mocean-nl-url"]).to.eq("test nl url");
  });

  it("should throw error when required field not set", () => {
    TestingUtils.makeMockRequest("number_lookup.json", "/nl", "post");

    const inquiryCall = () => {
      this.numberLookup.inquiry();
      return true;
    };

    expect(this.numberLookup.params).to.not.has.property("mocean-to");
    expect(inquiryCall).to.throw();
    this.numberLookup.setTo("test to");

    expect(inquiryCall()).to.be.true;
  });

  it("should return callback on inquiry", () => {
    TestingUtils.makeMockRequest("number_lookup.json", "/nl", "post");

    this.numberLookup.setTo("test to");
    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.numberLookup.inquiry(null, fake);
    });
  });

  it("should return promise on inquiry", () => {
    TestingUtils.makeMockRequest("number_lookup.json", "/nl", "post");

    this.numberLookup.setTo("test to");
    return this.numberLookup.inquiry().then(res => {
      testObj(res);
    });
  });
});
