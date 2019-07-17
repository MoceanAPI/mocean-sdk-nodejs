const AbstractMocean = require('../AbstractMocean');

class MessageStatus extends AbstractMocean {
    requiredField() {
        return [...super.requiredField(), ...['mocean-msgid']];
    }

    setMsgid(param) {
        this.params['mocean-msgid'] = param;
        return this;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    inquiry(params = null, callback = null) {
        this.params = Object.assign({}, this.params, params);

        this.createFinalParams();
        this.isRequiredFieldSets();

        const promise = this.transmitter.get('/report/message', this.params, callback);
        this.reset();

        return promise;
    }
}

module.exports = MessageStatus;
