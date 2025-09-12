const request = require("request");

class Transmitter {
  constructor(options) {
    this.options = Object.assign(Transmitter.defaultOptions(), options);
  }

  static defaultOptions() {
    return {
      baseUrl: "https://rest.moceanapi.com",
      version: "2"
    };
  }

  get(uri, params, callback = null) {
    return this.send("get", uri, params, callback);
  }

  post(uri, params, callback = null) {
    return this.send("post", uri, params, callback);
  }

  send(method, uri, params, callback = null) {
    const clonedParams = Object.assign({}, params);
    if (clonedParams["mocean-medium"] === "CLI") {
      clonedParams["mocean-medium"] = "NODECLI-SDK";
    }

    if (!clonedParams["mocean-medium"]) {
      clonedParams["mocean-medium"] = "NODEJS-SDK";
    }

    // use json
    clonedParams["mocean-resp-format"] = "json";

    const response = this.makeRequest({
      baseUrl: `${this.options.baseUrl}/rest/${this.options.version}`,
      uri,
      method,
      headers: {
        'Authorization': 'Bearer '+clonedParams["mocean-api-token"],
      },
      qs: method === "get" ? clonedParams : {},
      form: method === "post" ? clonedParams : {},
      encoding: null
    });

    if (callback === null) {
      // return promise wrapper if no callback passed in
      return response;
    }

    // expect to be callback base
    return response
      .then(res => {
        return callback(null, res);
      })
      .catch(err => {
        return callback(err, null);
      });
  }

  makeRequest(httpOptions) {
    return new Promise((resolve, reject) => {
      request(httpOptions, (err, res, body) => {
        if (err) {
          return reject(err);
        }

        if (res.headers["content-type"] === "audio/mpeg") {
          return resolve(body);
        }

        try {
          const parsedBody = JSON.parse(body);
          if (
            parsedBody.status &&
            parsedBody.status !== 0 &&
            parsedBody.status !== "0"
          ) {
            return reject(parsedBody);
          }

          return resolve(parsedBody);
        } catch (e) {
          return reject(e);
        }
      });
    });
  }
}

module.exports = Transmitter;
