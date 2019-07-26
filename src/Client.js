class Client {
  constructor(apiKey = "", apiSecret = "") {
    this.params = {
      "mocean-api-key": apiKey,
      "mocean-api-secret": apiSecret
    };
  }

  setApiKey(param) {
    this.params["mocean-api-key"] = param;
  }

  setApiSecret(param) {
    this.params["mocean-api-secret"] = param;
  }
}

module.exports = Client;
