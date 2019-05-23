const AbstractMocean = require('../AbstractMocean');

class Pricing extends AbstractMocean {
    constructor(objAuth, options) {
        super(objAuth, options);
        super.required_fields = ['mocean-api-key', 'mocean-api-secret'];
    }

    setMcc(param) {
        this.params['mocean-mcc'] = param;
        return this;
    }

    setMnc(param) {
        this.params['mocean-mnc'] = param;
        return this;
    }

    setDelimiter(param) {
        this.params['mocean-delimiter'] = param;
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

        const promise = this.transmitter.get('/account/pricing', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = Pricing;
