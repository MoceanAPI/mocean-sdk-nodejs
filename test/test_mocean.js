const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../src/app');

describe("Credentials test", () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';

    it('should create a credentials object', () => {
        const credentials = new client.Client(apiKey, apiSecret);

        expect(credentials).to.be.an('object');
    });

    it('should expose params from credentials object', () => {
        const credentials = new client.Client(apiKey, apiSecret);

        expect(credentials.params).to.be.an('object');
        expect(credentials.params).to.has.property('mocean-api-key');
        expect(credentials.params).to.has.property('mocean-api-secret');
        expect(credentials.params['mocean-api-key']).to.be.a('string');
        expect(credentials.params['mocean-api-secret']).to.be.a('string');
        expect(credentials.params['mocean-api-key']).to.equal(apiKey);
        expect(credentials.params['mocean-api-secret']).to.equal(apiSecret);
    });

    it('should able to set params through setter', () => {
        const credentials = new client.Client();

        expect(credentials.params['mocean-api-key']).to.be.empty;
        expect(credentials.params['mocean-api-secret']).to.be.empty;

        credentials.setApiKey(apiKey);
        credentials.setApiSecret(apiSecret);

        expect(credentials.params['mocean-api-key']).to.equal(apiKey);
        expect(credentials.params['mocean-api-secret']).to.equal(apiSecret);
    })
});

describe("Mocean Test", () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';

    it('should create a mocean object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        expect(mocean).to.be.an('object');
    });

    it('should throw error when credentials not set', () => {
        const nullApiKey = () => {
            new client.Mocean(new client.Client(null, apiSecret));
        };
        const nullApiSecret = () => {
            new client.Mocean(new client.Client(apiKey, null));
        };
        const bothNull = () => {
            new client.Mocean(new client.Client(null, null));
        };
        const emptyApiKey = () => {
            new client.Mocean(new client.Client('', apiSecret));
        };
        const emptyApiSecret = () => {
            new client.Mocean(new client.Client(apiKey, ''));
        };
        const bothEmpty = () => {
            new client.Mocean(new client.Client());
        };

        expect(nullApiKey).to.throw();
        expect(nullApiSecret).to.throw();
        expect(bothNull).to.throw();
        expect(emptyApiKey).to.throw();
        expect(emptyApiSecret).to.throw();
        expect(bothEmpty).to.throw();
    });

    it('should describe obj_auth as an credentials object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        expect(mocean.obj_auth).to.be.an.instanceOf(client.Client);
        expect(mocean.obj_auth).to.equal(credentials);
    });

    it('should expose sms object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        const sms = require('../src/modules/message/sms');
        expect(mocean.sms()).to.be.an.instanceOf(sms);
    });

    it('should expose balance object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        const balance = require('../src/modules/account/balance');
        expect(mocean.balance()).to.be.an.instanceOf(balance);
    });

    it('should expose pricing object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        const pricing = require('../src/modules/account/pricing');
        expect(mocean.pricing_list()).to.be.an.instanceOf(pricing);
    });

    it('should expose message_status object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        const message_status = require('../src/modules/message/message_status');
        expect(mocean.message_status()).to.be.an.instanceOf(message_status);
    });

    it('should expose verify_request object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        const verify_request = require('../src/modules/message/verify_request');
        expect(mocean.verify_request()).to.be.an.instanceOf(verify_request);
    });

    it('should expose verify_validate object', () => {
        const credentials = new client.Client(apiKey, apiSecret);
        const mocean = new client.Mocean(credentials);

        const verify_validate = require('../src/modules/message/verify_validate');
        expect(mocean.verify_validate()).to.be.an.instanceOf(verify_validate);
    });
});
