const Client = require('./Client');

class Mocean {
    constructor(client, options = {}) {
        if (!(client instanceof Client)) {
            throw Error('Object pass into Mocean must be Client');
        }
        if (!client.params['mocean-api-key'] || !client.params['mocean-api-secret']) {
            throw Error('api key and api secret can\'t be empty');
        }
        this.obj_auth = client;
        this.options = options;
    }

    sms() {
        const Sms = require('./modules/message/Sms');
        return new Sms(this.obj_auth, this.options);
    }

    flashSms() {
        const Sms = require('./modules/message/Sms');
        const sms = new Sms(this.obj_auth, this.options);
        sms.flashSms = true;
        return sms;
    }

    balance() {
        const Balance = require('./modules/account/Balance');
        return new Balance(this.obj_auth, this.options);
    }

    pricing_list() {
        const Pricing = require('./modules/account/Pricing');
        return new Pricing(this.obj_auth, this.options);
    }

    message_status() {
        const MessageStatus = require('./modules/message/MessageStatus');
        return new MessageStatus(this.obj_auth, this.options);
    }

    verify_request(resend = false) {
        const VerifyRequest = require('./modules/message/VerifyRequest');
        return new VerifyRequest(this.obj_auth, this.options, resend);
    }

    verify_validate() {
        const VerifyValidate = require('./modules/message/VerifyValidate');
        return new VerifyValidate(this.obj_auth, this.options);
    }

    number_lookup() {
        const NumberLookup = require('./modules/number_lookup/NumberLookup');
        return new NumberLookup(this.obj_auth, this.options);
    }

    voice() {
        const Voice = require('./modules/voice/Voice');
        return new Voice(this.obj_auth, this.options);
    }
}


module.exports = Mocean;
