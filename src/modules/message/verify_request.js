const {MoceanFactory, Transmitter} = require("../abstract");

class Verify_request extends MoceanFactory {
    constructor(client) {
        super(client);
        this.required_fields = ["mocean-api-key", "mocean-api-secret", "mocean-to", "brand"];
    }

    setBrand(param) {
        this.params['mocean-to'] = param;
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

    create(params = {}) {
        super.create(params);
        return this;
    }

    send(callback = (err, result) => {
    }) {
        this.createFinalParams();
        this.isRequiredFieldSets();
        var response = new Transmitter("/rest/1/verify/req", 'post', this.params, callback);
    }

}

module.exports = Verify_request;
