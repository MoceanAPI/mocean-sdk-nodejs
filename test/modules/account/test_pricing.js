const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');

describe('Pricing Test', () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';
    const credentials = new client.Client(apiKey, apiSecret);
    const mocean = new client.Mocean(credentials);

    it('should set params through setter', () => {
        const pricing = mocean.pricing_list();

        expect(pricing.params).to.not.has.property('mocean-mcc');
        pricing.setMcc('test mcc');
        expect(pricing.params).to.has.property('mocean-mcc');

        expect(pricing.params).to.not.has.property('mocean-mnc');
        pricing.setMnc('test mnc');
        expect(pricing.params).to.has.property('mocean-mnc');

        expect(pricing.params).to.not.has.property('mocean-delimiter');
        pricing.setDelimiter('test delimiter');
        expect(pricing.params).to.has.property('mocean-delimiter');

        expect(pricing.params).to.not.has.property('mocean-resp-format');
        pricing.setRespFormat('JSON');
        expect(pricing.params).to.has.property('mocean-resp-format');
    });

    it('should return callback on inquiry', async () => {
        const pricing = mocean.pricing_list();
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            pricing.inquiry(fake);
        });
    });

    it('should reset param after result', async () => {
        const pricing = mocean.pricing_list();
        pricing.setRespFormat('JSON');
        expect(pricing.params).to.has.property('mocean-resp-format');

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                expect(pricing.params).to.not.has.property('mocean-resp-format');
                resolve();
            });
            pricing.inquiry(fake);
        });
    });
});
