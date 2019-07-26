const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { Client } = require("../src/index");

describe("Credentials test", () => {
  const apiKey = "testapikey";
  const apiSecret = "testapisecret";

  it("should create a credentials object", () => {
    const credentials = new Client(apiKey, apiSecret);

    expect(credentials).to.be.an("object");
  });

  it("should expose params from credentials object", () => {
    const credentials = new Client(apiKey, apiSecret);

    expect(credentials.params).to.be.an("object");
    expect(credentials.params).to.has.property("mocean-api-key");
    expect(credentials.params).to.has.property("mocean-api-secret");
    expect(credentials.params["mocean-api-key"]).to.be.a("string");
    expect(credentials.params["mocean-api-secret"]).to.be.a("string");
    expect(credentials.params["mocean-api-key"]).to.equal(apiKey);
    expect(credentials.params["mocean-api-secret"]).to.equal(apiSecret);
  });

  it("should able to set params through setter", () => {
    const credentials = new Client();

    expect(credentials.params["mocean-api-key"]).to.be.empty;
    expect(credentials.params["mocean-api-secret"]).to.be.empty;

    credentials.setApiKey(apiKey);
    credentials.setApiSecret(apiSecret);

    expect(credentials.params["mocean-api-key"]).to.equal(apiKey);
    expect(credentials.params["mocean-api-secret"]).to.equal(apiSecret);
  });
});
