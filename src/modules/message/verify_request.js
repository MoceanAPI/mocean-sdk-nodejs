const {MoceanFactory, Transmitter} = require("../abstract");

class Verify_request extends MoceanFactory {
    constructor(client) {
        super(client);
        this.required_fields = ["mocean-api-key", "mocean-api-secret", "mocean-to", "mocean-brand"];
        this.verifyChargeType = 'CPC';
    }

    setBrand(param) {
        this.params['mocean-brand'] = param;
    }

    setFrom(param) {
        this.params['mocean-from'] = param;
    }

    setTo(param) {
        this.params['mocean-to'] = param;
    }

    setCodeLength(param) {
        this.params['mocean-code-length'] = param;
    }

    setTemplate(param) {
        this.params['mocean-template'] = param;
    }

    setPinValidity(param) {
        this.params['mocean-pin-validity'] = param;
    }

    setNextEventWait(param) {
        this.params['mocean-next-event-wait'] = param;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
    }

    sendAsCPA() {
        this.verifyChargeType = 'CPA';
    }

    sendAsCPC() {
        this.verifyChargeType = 'CPC';
    }

    create(params = {}) {
        super.create(params);
        return this;
    }

    send(callback = (err, result) => {
    }) {
        this.createFinalParams();
        this.isRequiredFieldSets();

        let verifyRequestUrl = '/rest/1/verify/req';
        if (this.verifyChargeType === 'CPA') {
            verifyRequestUrl += '/sms';
        }

        var response = new Transmitter(verifyRequestUrl, 'post', this.params, callback);
        this.reset();
    }

}

module.exports = Verify_request;
