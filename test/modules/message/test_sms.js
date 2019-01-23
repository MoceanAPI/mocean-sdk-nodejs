const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');

describe('SMS Test', () => {
    const apiKey = 'testapikey';
    const apiSecret = 'testapisecret';
    const credentials = new client.Client(apiKey, apiSecret);
    const mocean = new client.Mocean(credentials);

    it('should set params through setter', () => {
        const sms = mocean.sms();

        expect(sms.params).to.not.has.property('mocean-from');
        sms.setFrom('test from');
        expect(sms.params).to.has.property('mocean-from');

        expect(sms.params).to.not.has.property('mocean-to');
        sms.setTo('test to');
        expect(sms.params).to.has.property('mocean-to');

        expect(sms.params).to.not.has.property('mocean-text');
        sms.setText('test text');
        expect(sms.params).to.has.property('mocean-text');

        expect(sms.params).to.not.has.property('mocean-udh');
        sms.setUdh('test udh');
        expect(sms.params).to.has.property('mocean-udh');

        expect(sms.params).to.not.has.property('mocean-coding');
        sms.setCoding('test coding');
        expect(sms.params).to.has.property('mocean-coding');

        expect(sms.params).to.not.has.property('mocean-dlr-mask');
        sms.setDlrMask('test dlr mask');
        expect(sms.params).to.has.property('mocean-dlr-mask');

        expect(sms.params).to.not.has.property('mocean-dlr-url');
        sms.setDlrUrl('test dlr url');
        expect(sms.params).to.has.property('mocean-dlr-url');

        expect(sms.params).to.not.has.property('mocean-schedule');
        sms.setSchedule('test schedule');
        expect(sms.params).to.has.property('mocean-schedule');

        expect(sms.params).to.not.has.property('mocean-alt-dcs');
        sms.setAltDcs('test alt dcs');
        expect(sms.params).to.has.property('mocean-alt-dcs');

        expect(sms.params).to.not.has.property('mocean-charset');
        sms.setCharset('test charset');
        expect(sms.params).to.has.property('mocean-charset');

        expect(sms.params).to.not.has.property('mocean-validity');
        sms.setValidity('test validity');
        expect(sms.params).to.has.property('mocean-validity');

        expect(sms.params).to.not.has.property('mocean-resp-format');
        sms.setRespFormat('JSON');
        expect(sms.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        const sms = mocean.sms();
        const sendCall = () => {
            sms.send();
            return true;
        };

        expect(sms.params).to.not.has.property('mocean-text');
        expect(sendCall).to.throw();
        sms.setText('test text');

        expect(sms.params).to.not.has.property('mocean-from');
        expect(sendCall).to.throw();
        sms.setFrom('test from');

        expect(sms.params).to.not.has.property('mocean-to');
        expect(sendCall).to.throw();
        sms.setTo('test to');

        expect(sendCall()).to.be.true;
    });

    it('should return callback on send', async () => {
        const sms = mocean.sms();
        sms.setText('test text');
        sms.setFrom('test from');
        sms.setTo('test to');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            sms.send(fake);
        });
    });

    it('should reset param after result', async () => {
        const sms = mocean.sms();
        sms.setText('test text');
        sms.setFrom('test from');
        sms.setTo('test to');
        expect(sms.params).to.has.property('mocean-text');
        expect(sms.params).to.has.property('mocean-from');
        expect(sms.params).to.has.property('mocean-to');

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                expect(sms.params).to.not.has.property('mocean-text');
                expect(sms.params).to.not.has.property('mocean-from');
                expect(sms.params).to.not.has.property('mocean-to');
                resolve();
            });
            sms.send(fake);
        });
    });
});
