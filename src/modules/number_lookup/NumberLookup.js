const AbstractMocean = require('../AbstractMocean');

class NumberLookup extends AbstractMocean {
    requiredField() {
        return [...super.requiredField(), ...['mocean-to']];
    }

    setTo(param) {
        this.params['mocean-to'] = param;
        return this;
    }

    setNlUrl(param) {
        this.params['mocean-nl-url'] = param;
        return this;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    inquiry(params = null, callback = null) {
        this.params = Object.assign({}, this.params, params);

        this.createFinalParams();
        this.isRequiredFieldSets();

        const promise = this.transmitter.post('/nl', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = NumberLookup;
