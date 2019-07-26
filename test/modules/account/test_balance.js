const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean } = require("../../../src/index");

describe("Balance Test", () => {
  const testObj = res => {
    expect(res.status).to.eq(0);
    expect(res.value).to.eq(100);
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.balance = this.mocean.balance();
  });

  it("should return callback on inquiry", () => {
    TestingUtils.makeMockRequest("balance.json", "/account/balance");

    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.balance.inquiry(null, fake);
    });
  });

  it("should return promise on inquiry", () => {
    TestingUtils.makeMockRequest("balance.json", "/account/balance");

    return this.balance.inquiry().then(res => {
      testObj(res);
    });
  });
});
