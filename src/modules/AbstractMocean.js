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

        this.required_fields = [];
    }

    create(params) {
        this.reset();
        this.params = Object.assign({}, this.params, params);
    }

    createFinalParams() {
        const newParams = {};
        let key = '';
        for (const i in this.params) {
            if (this.params[i].length > 0 && this.params[i] != null) {
                key = i;
                // append prefix mocean- if not exist in key
                if (!key.match(/^mocean-/i)) {
                    key = 'mocean-' + i;
                }
                newParams[key] = this.params[i];
            }
        }
        this.params = newParams;
    }

    isRequiredFieldSets() {
        for (const i in this.required_fields) {
            if (typeof this.params[this.required_fields[i]] === 'undefined') {
                throw Error(`${this.required_fields[i]} is mandatory field.`);
            }
        }
        return true;
    }

    reset() {
        this.params = {
            'mocean-api-key': this.params['mocean-api-key'],
            'mocean-api-secret': this.params['mocean-api-secret']
        };
    }
}

module.exports = AbstractMocean;
