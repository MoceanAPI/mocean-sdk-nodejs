class Client {
  constructor({apiKey = "", apiSecret = "", apiToken = ""}) {
    this.params = {
      "mocean-api-key": apiKey,
      "mocean-api-secret": apiSecret,
      "mocean-api-token": apiToken,
    };
  }

  setApiKey(param) {
    this.params["mocean-api-key"] = param;
  }

  setApiSecret(param) {
    this.params["mocean-api-secret"] = param;
  }

  setApiToken(param) {
    this.params["mocean-api-token"] = param;
  }
}

module.exports = Client;
