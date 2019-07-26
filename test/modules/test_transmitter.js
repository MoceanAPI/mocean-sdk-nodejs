const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../testing_utils");
const Transmitter = require("../../src/modules/Transmitter");

describe("Transmitter test", () => {
  beforeEach(() => {
    this.transmitter = new Transmitter();
  });

  it("should return err callback if status not equal 0 on send", done => {
    TestingUtils.makeMockRequest("error_response.json", "/test", "get", 400);

    const fake = sinon.fake(err => {
      try {
        expect(err.status).to.eq(1);
        expect(fake).has.been.called;
        return done();
      } catch (e) {
        return done(e);
      }
    });

    this.transmitter.send("get", "/test", { test: "test" }, fake);
  });

  it("should return err callback on send", done => {
    TestingUtils.makeMockRequest(
      "error_response.json",
      "/test",
      "get",
      400,
      true
    );

    const fake = sinon.fake(err => {
      try {
        expect(err.message).to.eq("unknown error");
        expect(fake).has.been.called;
        return done();
      } catch (e) {
        return done(e);
      }
    });

    this.transmitter.send("get", "/test", { test: "test" }, fake);
  });

  it("should throw if unable to parse response", done => {
    TestingUtils.makeMockRequest("error_response.xml", "/test", "get", 400);

    const fake = sinon.fake(err => {
      try {
        expect(err.name).to.eq("SyntaxError");
        expect(fake).has.been.called;
        return done();
      } catch (e) {
        return done(e);
      }
    });

    this.transmitter.send("get", "/test", { test: "test" }, fake);
  });
});
