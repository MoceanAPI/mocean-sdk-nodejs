const AbstractMocean = require('../AbstractMocean');

class Voice extends AbstractMocean {
    constructor(objAuth, options) {
        super(objAuth, options);
        super.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-to'];
    }

    setTo(param) {
        this.params['mocean-to'] = param;
        return this;
    }

    setCallEventUrl(param) {
        this.params['mocean-call-event-url'] = param;
        return this;
    }

    setCallControlCommands(param) {
        this.params['mocean-call-control-commands'] = param;
        return this;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    call(params = null, callback = null) {
        this.params = Object.assign({}, this.params, params);
        if (this.params['mocean-call-control-commands'] && typeof this.params['mocean-call-control-commands'].build === 'function') {
            this.params['mocean-call-control-commands'] = this.params['mocean-call-control-commands'].build();
        }
        if (this.params['mocean-call-control-commands']) {
            this.params['mocean-call-control-commands'] = JSON.stringify(this.params['mocean-call-control-commands']);
        }

        this.createFinalParams();
        this.isRequiredFieldSets();

        const promise = this.transmitter.get('/voice/dial', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = Voice;
