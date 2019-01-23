const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');

describe('Verify Validate Test', () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';
    const credentials = new client.Client(apiKey, apiSecret);
    const mocean = new client.Mocean(credentials);

    it('should set params through setter', () => {
        const verifyValidate = mocean.verify_validate();

        expect(verifyValidate.params).to.not.has.property('mocean-reqid');
        verifyValidate.setReqid('test req id');
        expect(verifyValidate.params).to.has.property('mocean-reqid');

        expect(verifyValidate.params).to.not.has.property('mocean-code');
        verifyValidate.setCode('test code');
        expect(verifyValidate.params).to.has.property('mocean-code');

        expect(verifyValidate.params).to.not.has.property('mocean-resp-format');
        verifyValidate.setRespFormat('JSON');
        expect(verifyValidate.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        const verifyValidate = mocean.verify_validate();
        const sendCall = () => {
            verifyValidate.send();
            return true;
        };

        expect(verifyValidate.params).to.not.has.property('mocean-reqid');
        expect(sendCall).to.throw();
        verifyValidate.setReqid('test req id');

        expect(verifyValidate.params).to.not.has.property('mocean-code');
        expect(sendCall).to.throw();
        verifyValidate.setCode('test code');

        expect(sendCall()).to.be.true;
    });

    it('should return callback on send', async () => {
        const verifyValidate = mocean.verify_validate();
        verifyValidate.setReqid('test req id');
        verifyValidate.setCode('test code');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            verifyValidate.send(fake);
        });
    });

    it('should reset param after result', async () => {
        const verifyValidate = mocean.verify_validate();
        verifyValidate.setReqid('test req id');
        verifyValidate.setCode('test code');
        expect(verifyValidate.params).to.has.property('mocean-reqid');
        expect(verifyValidate.params).to.has.property('mocean-code');

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                expect(verifyValidate.params).to.not.has.property('mocean-reqid');
                expect(verifyValidate.params).to.not.has.property('mocean-code');
                resolve();
            });
            verifyValidate.send(fake);
        });
    });
});
