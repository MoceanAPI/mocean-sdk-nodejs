const AbstractMocean = require('../AbstractMocean');

class NumberLookup extends AbstractMocean {
    constructor(objAuth, options) {
        super(objAuth, options);
        super.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-to'];
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

    inquiry(callback = null, params) {
        this.params = Object.assign({}, this.params, params);

        this.createFinalParams();
        this.isRequiredFieldSets();

        const promise = this.transmitter.get('/nl', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = NumberLookup;
