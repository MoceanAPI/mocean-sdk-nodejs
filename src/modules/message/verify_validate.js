const {MoceanFactory, Transmitter} = require('../abstract');

class Verify_validate extends MoceanFactory {
    constructor(client) {
        super(client);
        this.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-reqid', 'mocean-code'];
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

    create(params = {}) {
        super.create(params);
        return this;
    }

    send(callback = (err, result) => {
    }) {
        this.createFinalParams();
        this.isRequiredFieldSets();
        var response = new Transmitter('/rest/1/verify/check', 'post', this.params, callback);
        this.reset();
    }

}

module.exports = Verify_validate;
