const AbstractMocean = require('../AbstractMocean');

class VerifyRequest extends AbstractMocean {
    constructor(objAuth, options) {
        super(objAuth, options);
        super.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-to', 'mocean-brand'];
        this.verifyChargeType = 'CPC';
    }

    setBrand(param) {
        this.params['mocean-brand'] = param;
        return this;
    }

    setFrom(param) {
        this.params['mocean-from'] = param;
        return this;
    }

    setTo(param) {
        this.params['mocean-to'] = param;
        return this;
    }

    setCodeLength(param) {
        this.params['mocean-code-length'] = param;
        return this;
    }

    setTemplate(param) {
        this.params['mocean-template'] = param;
        return this;
    }

    setPinValidity(param) {
        this.params['mocean-pin-validity'] = param;
        return this;
    }

    setNextEventWait(param) {
        this.params['mocean-next-event-wait'] = param;
        return this;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    sendAsCPA() {
        this.verifyChargeType = 'CPA';
        return this;
    }

    sendAsCPC() {
        this.verifyChargeType = 'CPC';
        return this;
    }

    send(callback = null, params) {
        this.params = Object.assign({}, this.params, params);

        this.createFinalParams();
        this.isRequiredFieldSets();

        let verifyRequestUrl = '/verify/req';
        if (this.verifyChargeType === 'CPA') {
            verifyRequestUrl += '/sms';
        }

        const promise = this.transmitter.post(verifyRequestUrl, this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = VerifyRequest;
