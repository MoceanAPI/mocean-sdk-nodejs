const {MoceanFactory, Transmitter} = require("../abstract");

class Message_status extends MoceanFactory {
    constructor(client) {
        super(client);
        this.required_fields = ['mocean-api-key', 'mocean-api-password', 'mocean-msgid'];
    }

    setMsgid(param) {
        this.params['mocean-msgid'] = param;
        return this;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    inquiry(callback = (err, result) => {
    }, params) {
        this.params = Object.assign({}, this.params, params);
        this.createFinalParams();
        this.isRequiredFieldSets();
        var response = new Transmitter('/rest/1/report/message', 'get', this.params, callback);
        this.reset();
    }
}

module.exports = Message_status;
