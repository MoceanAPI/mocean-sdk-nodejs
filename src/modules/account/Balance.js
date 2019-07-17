const AbstractMocean = require('../AbstractMocean');

class Balance extends AbstractMocean {
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
