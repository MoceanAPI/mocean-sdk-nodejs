const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean } = require("../../../src/index");

describe("Pricing Test", () => {
  const testObj = res => {
    expect(res.status).to.eq(0);
    expect(res.destinations).to.have.lengthOf(25);
    expect(res.destinations[0].country).to.eq("Default");
    expect(res.destinations[0].operator).to.eq("Default");
    expect(res.destinations[0].mcc).to.eq("Default");
    expect(res.destinations[0].mnc).to.eq("Default");
    expect(res.destinations[0].price).to.eq(2);
    expect(res.destinations[0].currency).to.eq("MYR");
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.pricing = this.mocean.pricingList();
  });

  it("should set params through setter", () => {
    expect(this.pricing.params).to.not.has.property("mocean-mcc");
    this.pricing.setMcc("test mcc");
    expect(this.pricing.params).to.has.property("mocean-mcc");
    expect(this.pricing.params["mocean-mcc"]).to.eq("test mcc");

    expect(this.pricing.params).to.not.has.property("mocean-mnc");
    this.pricing.setMnc("test mnc");
    expect(this.pricing.params).to.has.property("mocean-mnc");
    expect(this.pricing.params["mocean-mnc"]).to.eq("test mnc");

    expect(this.pricing.params).to.not.has.property("mocean-delimiter");
    this.pricing.setDelimiter("test delimiter");
    expect(this.pricing.params).to.has.property("mocean-delimiter");
    expect(this.pricing.params["mocean-delimiter"]).to.eq("test delimiter");
  });

  it("should return callback on inquiry", () => {
    TestingUtils.makeMockRequest("price.json", "/account/pricing");

    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.pricing.inquiry(null, fake);
    });
  });

  it("should return promise on inquiry", () => {
    TestingUtils.makeMockRequest("price.json", "/account/pricing");

    return this.pricing.inquiry().then(res => {
      testObj(res);
    });
  });
});
