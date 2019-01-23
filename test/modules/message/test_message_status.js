const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');

describe('Message Status Test', () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';
    const credentials = new client.Client(apiKey, apiSecret);
    const mocean = new client.Mocean(credentials);

    it('should set params through setter', () => {
        const messageStatus = mocean.message_status();

        expect(messageStatus.params).to.not.has.property('mocean-msgid');
        messageStatus.setMsgid('test msg id');
        expect(messageStatus.params).to.has.property('mocean-msgid');

        expect(messageStatus.params).to.not.has.property('mocean-resp-format');
        messageStatus.setRespFormat('JSON');
        expect(messageStatus.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        const messageStatus = mocean.message_status();
        const inquiryCall = () => {
            messageStatus.inquiry();
            return true;
        };

        expect(messageStatus.params).to.not.has.property('mocean-msgid');
        expect(inquiryCall).to.throw();

        messageStatus.setMsgid('test msgid');
        expect(inquiryCall()).to.be.true;
    });

    it('should return callback on inquiry', () => {
        const messageStatus = mocean.message_status();
        messageStatus.setMsgid('test msg id');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            messageStatus.inquiry(fake);
        });
    });

    it('should reset param after result', () => {
        const messageStatus = mocean.message_status();
        messageStatus.setMsgid('test msg id');
        expect(messageStatus.params).to.has.property('mocean-msgid');

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                expect(messageStatus.params).to.not.has.property('mocean-msgid');
                resolve();
            });
            messageStatus.inquiry(fake);
        });
    });
});
