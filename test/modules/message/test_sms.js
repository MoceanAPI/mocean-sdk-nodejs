const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean } = require("../../../src/index");

describe("SMS Test", () => {
  const testObj = res => {
    expect(res.messages[0].status).to.eq(0);
    expect(res.messages[0].receiver).to.eq("60123456789");
    expect(res.messages[0].msgid).to.eq("CPASS_restapi_C0000002737000000.0001");
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.sms = this.mocean.sms();
  });

  it("should set params through setter", () => {
    expect(this.sms.params).to.not.has.property("mocean-from");
    this.sms.setFrom("test from");
    expect(this.sms.params).to.has.property("mocean-from");
    expect(this.sms.params["mocean-from"]).to.eq("test from");

    expect(this.sms.params).to.not.has.property("mocean-to");
    this.sms.addTo("test to");
    expect(this.sms.params["mocean-to"]).to.eq("test to");

    this.sms.setTo("test to2");
    expect(this.sms.params["mocean-to"]).to.eq("test to2");

    expect(this.sms.params).to.not.has.property("mocean-text");
    this.sms.setText("test text");
    expect(this.sms.params).to.has.property("mocean-text");
    expect(this.sms.params["mocean-text"]).to.eq("test text");

    expect(this.sms.params).to.not.has.property("mocean-udh");
    this.sms.setUdh("test udh");
    expect(this.sms.params).to.has.property("mocean-udh");
    expect(this.sms.params["mocean-udh"]).to.eq("test udh");

    expect(this.sms.params).to.not.has.property("mocean-coding");
    this.sms.setCoding("test coding");
    expect(this.sms.params).to.has.property("mocean-coding");
    expect(this.sms.params["mocean-coding"]).to.eq("test coding");

    expect(this.sms.params).to.not.has.property("mocean-dlr-mask");
    this.sms.setDlrMask("test dlr mask");
    expect(this.sms.params).to.has.property("mocean-dlr-mask");
    expect(this.sms.params["mocean-dlr-mask"]).to.eq("test dlr mask");

    expect(this.sms.params).to.not.has.property("mocean-dlr-url");
    this.sms.setDlrUrl("test dlr url");
    expect(this.sms.params).to.has.property("mocean-dlr-url");
    expect(this.sms.params["mocean-dlr-url"]).to.eq("test dlr url");

    expect(this.sms.params).to.not.has.property("mocean-schedule");
    this.sms.setSchedule("test schedule");
    expect(this.sms.params).to.has.property("mocean-schedule");
    expect(this.sms.params["mocean-schedule"]).to.eq("test schedule");

    expect(this.sms.params).to.not.has.property("mocean-mclass");
    this.sms.setMclass("test mclass");
    expect(this.sms.params).to.has.property("mocean-mclass");
    expect(this.sms.params["mocean-mclass"]).to.eq("test mclass");

    expect(this.sms.params).to.not.has.property("mocean-alt-dcs");
    this.sms.setAltDcs("test alt dcs");
    expect(this.sms.params).to.has.property("mocean-alt-dcs");
    expect(this.sms.params["mocean-alt-dcs"]).to.eq("test alt dcs");

    expect(this.sms.params).to.not.has.property("mocean-charset");
    this.sms.setCharset("test charset");
    expect(this.sms.params).to.has.property("mocean-charset");
    expect(this.sms.params["mocean-charset"]).to.eq("test charset");

    expect(this.sms.params).to.not.has.property("mocean-validity");
    this.sms.setValidity("test validity");
    expect(this.sms.params).to.has.property("mocean-validity");
    expect(this.sms.params["mocean-validity"]).to.eq("test validity");

    this.sms.addTo("test to3");
    expect(this.sms.params["mocean-to"]).to.eq("test to2,test to3");
  });

  it("should throw error when required field not set", () => {
    TestingUtils.makeMockRequest("message.json", "/sms", "post");

    const sendCall = () => {
      this.sms.send();
      return true;
    };

    expect(this.sms.params).to.not.has.property("mocean-text");
    expect(sendCall).to.throw();
    this.sms.setText("test text");

    expect(this.sms.params).to.not.has.property("mocean-from");
    expect(sendCall).to.throw();
    this.sms.setFrom("test from");

    expect(this.sms.params).to.not.has.property("mocean-to");
    expect(sendCall).to.throw();
    this.sms.setTo("test to");

    expect(sendCall()).to.be.true;
  });

  it("should return callback on send", () => {
    TestingUtils.makeMockRequest("message.json", "/sms", "post");

    this.sms.setText("test text");
    this.sms.setFrom("test from");
    this.sms.setTo("test to");
    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.sms.send(null, fake);
    });
  });

  it("should return promise on send", () => {
    TestingUtils.makeMockRequest("message.json", "/sms", "post");

    this.sms.setText("test text");
    this.sms.setFrom("test from");
    this.sms.setTo("test to");
    this.sms.flashSms = true;
    return this.sms.send().then(res => {
      testObj(res);
    });
  });
});
