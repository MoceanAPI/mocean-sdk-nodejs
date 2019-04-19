const {MoceanFactory, Transmitter} = require("../abstract");

class NumberLookup extends MoceanFactory {
    constructor(client) {
        super(client);
        this.required_fields = ['mocean-api-key', 'mocean-api-secret', 'mocean-to'];
    }

    setTo(param) {
        this.params['mocean-to'] = param;
        return this;
    }

    setNlUrl(param) {
        this.params['mocean-nl-url'] = param;
        return this;
    }

    setRespFormat(param) {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    inquiry(callback = (err, result) => {
    }) {
        this.createFinalParams();
        this.isRequiredFieldSets();
        var response = new Transmitter('/rest/1/nl', 'get', this.params, callback);
        this.reset();
    }
}

module.exports = NumberLookup;
