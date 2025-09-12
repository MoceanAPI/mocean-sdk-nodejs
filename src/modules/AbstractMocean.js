const Transmitter = require("./Transmitter");

class AbstractMocean {
  constructor(objAuth, options) {
    this.params = {
      "mocean-api-key": objAuth.params["mocean-api-key"],
      "mocean-api-secret": objAuth.params["mocean-api-secret"],
      "mocean-api-token": objAuth.params["mocean-api-token"]
    };

    // if there's a transmitter client passed in, use that
    if (options.transmitter) {
      this.transmitter = options.transmitter;
    } else {
      this.transmitter = new Transmitter(options);
    }
  }

  create(params) {
    this.params = Object.assign({}, this.params, params);
    return this;
  }

  createFinalParams() {
    const newParams = {};
    Object.keys(this.params).forEach(key => {
      if (this.params[key] !== null && this.params[key] !== undefined) {
        newParams[key.match(/^mocean-/i) ? key : `mocean-${key}`] = this.params[
          key
        ];
      }
    });
    this.params = newParams;
  }

  isRequiredFieldSets() {
    this.requiredField().forEach(requiredField => {
      if (typeof this.params[requiredField] === "undefined") {
        throw Error(`${requiredField} is mandatory field.`);
      }
    });
    return true;
  }

  createAndValidate(params) {
    this.create(params);
    this.createFinalParams();
    this.isRequiredFieldSets();
  }

  requiredField() {
    return ["mocean-api-key", "mocean-api-secret"];
  }
}

module.exports = AbstractMocean;
