const Transmitter = require('./Transmitter');

class AbstractMocean {
    constructor(objAuth, options) {
        this.params = {
            'mocean-api-key': objAuth.params['mocean-api-key'],
            'mocean-api-secret': objAuth.params['mocean-api-secret']
        };

        // if there's a transmitter client passed in, use that
        if (options.transmitter) {
            this.transmitter = options.transmitter;
        } else {
            this.transmitter = new Transmitter(options);
        }
    }

    create(params) {
        this.reset();
        this.params = Object.assign({}, this.params, params);
    }

    createFinalParams() {
        const newParams = {};
        Object.entries(this.params).forEach(([key, val]) => {
            if (val !== null && val.length > 0) {
                newParams[key.match(/^mocean-/i) ? key : 'mocean-' + key] = val;
            }
        });
        this.params = newParams;
    }

    isRequiredFieldSets() {
        this.requiredField().forEach((requiredField) => {
            if (typeof this.params[requiredField] === 'undefined') {
                throw Error(`${requiredField} is mandatory field.`);
            }
        });
        return true;
    }

    reset() {
        this.params = {
            'mocean-api-key': this.params['mocean-api-key'],
            'mocean-api-secret': this.params['mocean-api-secret']
        };
    }

    requiredField() {
        return ['mocean-api-key', 'mocean-api-secret'];
    }
}

module.exports = AbstractMocean;
