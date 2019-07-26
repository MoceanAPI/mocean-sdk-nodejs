const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const TestingUtils = require('../../testing_utils');
const { Client, Mocean } = require('../../../src/index');

describe('Message Status Test', () => {
    const testObj = (res) => {
        expect(res.status).to.eq(0);
        expect(res.message_status).to.eq(5);
        expect(res.msgid).to.eq('CPASS_restapi_C0000002737000000.0001');
        expect(res.credit_deducted).to.eq(0);
    };

    beforeEach(() => {
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new Client(apiKey, apiSecret);
        this.mocean = new Mocean(credentials);
        this.messageStatus = this.mocean.message_status();
    });

    it('should set params through setter', () => {
        expect(this.messageStatus.params).to.not.has.property('mocean-msgid');
        this.messageStatus.setMsgid('test msg id');
        expect(this.messageStatus.params).to.has.property('mocean-msgid');
        expect(this.messageStatus.params['mocean-msgid']).to.eq('test msg id');
    });

    it('should throw error when required field not set', () => {
        TestingUtils.makeMockRequest('message_status.json', '/report/message');

        const inquiryCall = () => {
            this.messageStatus.inquiry();
            return true;
        };

        expect(this.messageStatus.params).to.not.has.property('mocean-msgid');
        expect(inquiryCall).to.throw();

        this.messageStatus.setMsgid('test msgid');
        expect(inquiryCall()).to.be.true;
    });

    it('should return callback on inquiry', () => {
        TestingUtils.makeMockRequest('message_status.json', '/report/message');

        this.messageStatus.setMsgid('test msg id');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake((err, res) => {
                if (err) {
                    return reject(err);
                }
                testObj(res);
                expect(fake).has.been.called;
                resolve();
            });
            this.messageStatus.inquiry(null, fake);
        });
    });

    it('should return promise on inquiry', () => {
        TestingUtils.makeMockRequest('message_status.json', '/report/message');

        this.messageStatus.setMsgid('test msg id');
        return this.messageStatus.inquiry()
            .then(res => {
                testObj(res);
            });
    });
});
