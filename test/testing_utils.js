const nock = require("nock");
const fs = require("fs");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

module.exports = {
  fileResponse(filename) {
    return fs.createReadStream(`${__dirname}/resources/${filename}`);
  },
  verifyParamsWith(body, object) {
    const parsedBody = new URLSearchParams(body);
    Object.keys(object).forEach(key => {
      expect(parsedBody.get(key)).to.equal(object[key]);
    });
  },
  makeMockRequest(uri, method = "GET", version = "2") {
    return nock("https://rest.moceanapi.com")
      .intercept(`/rest/${version}${uri}`, method)
      .query(true)
      .once();
  }
};
