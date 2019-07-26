const nock = require("nock");

module.exports = {
  makeMockRequest(
    fileName,
    uri,
    method = "GET",
    statusCode = 200,
    isError = false,
    errorMsg = "unknown error",
    version = "2"
  ) {
    const nockIns = nock("https://rest.moceanapi.com")
      .intercept(`/rest/${version}${uri}`, method)
      .query(true)
      .once();

    if (!isError) {
      nockIns.replyWithFile(statusCode, `${__dirname}/resources/${fileName}`, {
        "Content-Type": "application/json"
      });
    } else {
      nockIns.replyWithError(errorMsg);
    }
  }
};
