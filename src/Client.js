class Client {
    constructor(api_key = '', api_secret = '') {
        this.params = {
            'mocean-api-key': api_key,
            'mocean-api-secret': api_secret
        };
    }

    setApiKey(param) {
        this.params['mocean-api-key'] = param;
    }

    setApiSecret(param) {
        this.params['mocean-api-secret'] = param;
    }
}

module.exports = Client;
