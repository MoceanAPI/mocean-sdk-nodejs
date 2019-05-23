const AbstractMocean = require('../AbstractMocean');

class MessageStatus extends AbstractMocean {
    constructor(objAuth, options) {
        super(objAuth, options);
        super.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-msgid'];
    }

    setMsgid(param) {
        this.params['mocean-msgid'] = param;
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

        const promise = this.transmitter.get('/report/message', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = MessageStatus;
