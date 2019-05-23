const AbstractMocean = require('../AbstractMocean');

class VerifyRequest extends AbstractMocean {
    constructor(objAuth, options) {
        super(objAuth, options);
        super.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-to', 'mocean-brand'];
        this.channel = 'auto';
        this.isResend = false;
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

    setReqId(param) {
        this.params['mocean-reqid'] = param;
        return this;
    }

    sendAs(channel = 'auto') {
        this.channel = channel;
        return this;
    }

    resend(callback = null, params) {
        this.sendAs('sms');
        this.isResend = true;
        super.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-reqid'];

        return this.send(callback, params);
    }

    send(callback = null, params) {
        this.params = Object.assign({}, this.params, params);

        this.createFinalParams();
        this.isRequiredFieldSets();

        let verifyRequestUrl = '/verify';
        if (this.isResend) {
            verifyRequestUrl += '/resend';
        } else {
            verifyRequestUrl += '/req';
        }

        if (this.channel.toLowerCase() === 'sms') {
            verifyRequestUrl += '/sms';
        }

        const promise = this.transmitter.post(verifyRequestUrl, this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = VerifyRequest;
