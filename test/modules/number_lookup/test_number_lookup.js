const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');

describe('Number Lookup Test', () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';
    const credentials = new client.Client(apiKey, apiSecret);
    const mocean = new client.Mocean(credentials);

    it('should set params through setter', () => {
        const numberLookup = mocean.number_lookup();

        expect(numberLookup.params).to.not.has.property('mocean-to');
        numberLookup.setTo('test to');
        expect(numberLookup.params).to.has.property('mocean-to');

        expect(numberLookup.params).to.not.has.property('mocean-nl-url');
        numberLookup.setNlUrl('test nl url');
        expect(numberLookup.params).to.has.property('mocean-nl-url');

        expect(numberLookup.params).to.not.has.property('mocean-resp-format');
        numberLookup.setRespFormat('JSON');
        expect(numberLookup.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        const number_lookup = mocean.number_lookup();
        const inquiryCall = () => {
            number_lookup.inquiry();
            return true;
        };

        expect(number_lookup.params).to.not.has.property('mocean-to');
        expect(inquiryCall).to.throw();
        number_lookup.setTo('test to');

        expect(inquiryCall()).to.be.true;
    });

    it('should return callback on inquiry', () => {
        const number_lookup = mocean.number_lookup();
        number_lookup.setTo('test to');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            number_lookup.inquiry(fake);
        });
    });

    it('should reset param after result', () => {
        const number_lookup = mocean.number_lookup();
        number_lookup.setTo('test to');
        expect(number_lookup.params).to.has.property('mocean-to');

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                expect(number_lookup.params).to.not.has.property('mocean-to');
                resolve();
            });
            number_lookup.inquiry(fake);
        });
    });
});
