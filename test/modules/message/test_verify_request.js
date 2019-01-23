const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');

describe('Verify Request Test', () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';
    const credentials = new client.Client(apiKey, apiSecret);
    const mocean = new client.Mocean(credentials);

    it('should set params through setter', () => {
        const verifyRequest = mocean.verify_request();

        expect(verifyRequest.params).to.not.has.property('mocean-brand');
        verifyRequest.setBrand('test brand');
        expect(verifyRequest.params).to.has.property('mocean-brand');

        expect(verifyRequest.params).to.not.has.property('mocean-from');
        verifyRequest.setFrom('test from');
        expect(verifyRequest.params).to.has.property('mocean-from');

        expect(verifyRequest.params).to.not.has.property('mocean-to');
        verifyRequest.setTo('test to');
        expect(verifyRequest.params).to.has.property('mocean-to');

        expect(verifyRequest.params).to.not.has.property('mocean-code-length');
        verifyRequest.setCodeLength('test code length');
        expect(verifyRequest.params).to.has.property('mocean-code-length');

        expect(verifyRequest.params).to.not.has.property('mocean-pin-validity');
        verifyRequest.setPinValidity('test pin validity');
        expect(verifyRequest.params).to.has.property('mocean-pin-validity');

        expect(verifyRequest.params).to.not.has.property('mocean-next-event-wait');
        verifyRequest.setNextEventWait('test next event wait');
        expect(verifyRequest.params).to.has.property('mocean-next-event-wait');

        expect(verifyRequest.params).to.not.has.property('mocean-resp-format');
        verifyRequest.setRespFormat('JSON');
        expect(verifyRequest.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        const verifyRequest = mocean.verify_request();
        const sendCall = () => {
            verifyRequest.send();
            return true;
        };

        expect(verifyRequest.params).to.not.has.property('mocean-to');
        expect(sendCall).to.throw();
        verifyRequest.setTo('test to');

        expect(verifyRequest.params).to.not.has.property('mocean-brand');
        expect(sendCall).to.throw();
        verifyRequest.setBrand('test brand');

        expect(sendCall()).to.be.true;
    });

    it('should return callback on send', async () => {
        const verifyRequest = mocean.verify_request();
        verifyRequest.setTo('test to');
        verifyRequest.setBrand('test brand');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            verifyRequest.send(fake);
        });
    });

    it('should reset param after result', async () => {
        const verifyRequest = mocean.verify_request();
        verifyRequest.setTo('test to');
        verifyRequest.setBrand('test brand');
        expect(verifyRequest.params).to.has.property('mocean-brand');
        expect(verifyRequest.params).to.has.property('mocean-to');

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                expect(verifyRequest.params).to.not.has.property('mocean-brand');
                expect(verifyRequest.params).to.not.has.property('mocean-to');
                resolve();
            });
            verifyRequest.send(fake);
        });
    });
});
