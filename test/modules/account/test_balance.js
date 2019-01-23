const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');

describe('Balance Test', () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';
    const credentials = new client.Client(apiKey, apiSecret);
    const mocean = new client.Mocean(credentials);

    it('should set response format through setter', () => {
        const balance = mocean.balance();
        expect(balance.params).to.not.has.property('mocean-resp-format');

        balance.setRespFormat('JSON');
        expect(balance.params).to.has.property('mocean-resp-format');
    });

    it('should return callback on inquiry', () => {
        const balance = mocean.balance();
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            balance.inquiry(fake);
        });
    });

    it('should reset param after result', () => {
        const balance = mocean.balance();
        balance.setRespFormat('JSON');
        expect(balance.params).to.has.property('mocean-resp-format');

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                expect(balance.params).to.not.has.property('mocean-resp-format');
                resolve();
            });
            balance.inquiry(fake);
        });
    });
});
