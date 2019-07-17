const AbstractMocean = require('../AbstractMocean');

class VerifyValidate extends AbstractMocean {
    requiredField() {
        return [...super.requiredField(), ...['mocean-reqid', 'mocean-code']];
    }

    setReqid(param) {
        this.params['mocean-reqid'] = param;
        return this;
    }

    setCode(param) {
        this.params['mocean-code'] = param;
        return this;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    send(params = null, callback = null) {
        this.params = Object.assign({}, this.params, params);

        this.createFinalParams();
        this.isRequiredFieldSets();

        const promise = this.transmitter.post('/verify/check', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = VerifyValidate;
