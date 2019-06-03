const AbstractMocean = require('../AbstractMocean');

class Balance extends AbstractMocean {
    constructor(objAuth, options) {
        super(objAuth, options);
        super.required_fields = ['mocean-api-key', 'mocean-api-secret'];
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    inquiry(params = null, callback = null) {
        this.params = Object.assign({}, this.params, params);

        this.createFinalParams();
        this.isRequiredFieldSets();

        const promise = this.transmitter.get('/account/balance', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = Balance;
