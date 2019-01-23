class Client {
    constructor(api_key = '', api_secret = '') {
        this.params = {'mocean-api-key': api_key, 'mocean-api-secret': api_secret}
    }

    setApiKey(param) {
        this.params['mocean-api-key'] = param
    }

    setApiSecret(param) {
        this.params['mocean-api-secret'] = param
    }
}


class Mocean {
    constructor(client) {
        if (!(client instanceof Client)) {
            throw Error('Object pass into Mocean must be Client');
        }
        if (!client.params['mocean-api-key'] || !client.params['mocean-api-secret']) {
            throw Error(`api key and api secret can't be empty`);
        }
        this.obj_auth = client;
    }

    sms() {
        var sms = require('./modules/message/sms');
        return new sms(this.obj_auth);
    }

    flashSms() {
        var sms = require('./modules/message/sms');
        sms = new sms(this.obj_auth);
        sms.flashSms = true;
        return sms;
    }

    balance() {
        var balance = require('./modules/account/balance');
        return new balance(this.obj_auth);
    }

    pricing_list() {
        var pricing = require('./modules/account/pricing');
        return new pricing(this.obj_auth);
    }

    message_status() {
        var message_status = require('./modules/message/message_status');
        return new message_status(this.obj_auth);
    }

    verify_request() {
        var verify_request = require('./modules/message/verify_request');
        return new verify_request(this.obj_auth);
    }

    verify_validate() {
        var verify_validate = require('./modules/message/verify_validate');
        return new verify_validate(this.obj_auth);
    }
}


exports.Mocean = Mocean;
exports.Client = Client;
