const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { Client, Mocean } = require("../src/index");
const Transmitter = require("../src/modules/Transmitter");

describe("Mocean Test", () => {
  const apiKey = "testapikey";
  const apiSecret = "testapisecret";

  it("should create a mocean object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    expect(mocean).to.be.an("object");
  });

  it("should throw error if credential is not client object", () => {
    expect(() => {
      new Mocean({});
    }).to.throw();
  });

  it("should throw error when credentials not set", () => {
    const nullApiKey = () => {
      new Mocean(new Client(null, apiSecret));
    };
    const nullApiSecret = () => {
      new Mocean(new Client(apiKey, null));
    };
    const bothNull = () => {
      new Mocean(new Client(null, null));
    };
    const emptyApiKey = () => {
      new Mocean(new Client("", apiSecret));
    };
    const emptyApiSecret = () => {
      new Mocean(new Client(apiKey, ""));
    };
    const bothEmpty = () => {
      new Mocean(new Client());
    };

    expect(nullApiKey).to.throw();
    expect(nullApiSecret).to.throw();
    expect(bothNull).to.throw();
    expect(emptyApiKey).to.throw();
    expect(emptyApiSecret).to.throw();
    expect(bothEmpty).to.throw();
  });

  it("should inject transmitter when passed in by constructor", () => {
    const transmmiter = new Transmitter({
      baseUrl: "http://test.com"
    });
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials, { transmitter: transmmiter });
    expect(mocean.sms().transmitter).to.eq(transmmiter);
  });

  it("should describe obj_auth as an credentials object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    expect(mocean.obj_auth).to.be.an.instanceOf(Client);
    expect(mocean.obj_auth).to.equal(credentials);
  });

  it("should expose sms object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    const sms = require("../src/modules/message/Sms");
    expect(mocean.sms()).to.be.an.instanceOf(sms);
  });

  it("should export sms object using flashSms", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    const sms = require("../src/modules/message/Sms");
    expect(mocean.flashSms()).to.be.an.instanceOf(sms);
    expect(mocean.flashSms().flashSms).to.be.true;
  });

  it("should expose balance object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    const balance = require("../src/modules/account/Balance");
    expect(mocean.balance()).to.be.an.instanceOf(balance);
  });

  it("should expose pricing object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    const pricing = require("../src/modules/account/Pricing");
    expect(mocean.pricingList()).to.be.an.instanceOf(pricing);
  });

  it("should expose message_status object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    const messageStatus = require("../src/modules/message/MessageStatus");
    expect(mocean.messageStatus()).to.be.an.instanceOf(messageStatus);
  });

  it("should expose verify_request object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    const verifyRequest = require("../src/modules/message/VerifyRequest");
    expect(mocean.verifyRequest()).to.be.an.instanceOf(verifyRequest);
  });

  it("should expose verify_validate object", () => {
    const credentials = new Client(apiKey, apiSecret);
    const mocean = new Mocean(credentials);

    const verifyValidate = require("../src/modules/message/VerifyValidate");
    expect(mocean.verifyValidate()).to.be.an.instanceOf(verifyValidate);
  });
});
