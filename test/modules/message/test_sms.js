const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');
const Transmitter = require('../../../src/modules/Transmitter');

describe('SMS Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new client.Client(apiKey, apiSecret);
        this.mocean = new client.Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.sms = this.mocean.sms();
    });

    it('should set params through setter', () => {
        expect(this.sms.params).to.not.has.property('mocean-from');
        this.sms.setFrom('test from');
        expect(this.sms.params).to.has.property('mocean-from');

        expect(this.sms.params).to.not.has.property('mocean-to');
        this.sms.setTo('test to');
        expect(this.sms.params).to.has.property('mocean-to');

        expect(this.sms.params).to.not.has.property('mocean-text');
        this.sms.setText('test text');
        expect(this.sms.params).to.has.property('mocean-text');

        expect(this.sms.params).to.not.has.property('mocean-udh');
        this.sms.setUdh('test udh');
        expect(this.sms.params).to.has.property('mocean-udh');

        expect(this.sms.params).to.not.has.property('mocean-coding');
        this.sms.setCoding('test coding');
        expect(this.sms.params).to.has.property('mocean-coding');

        expect(this.sms.params).to.not.has.property('mocean-dlr-mask');
        this.sms.setDlrMask('test dlr mask');
        expect(this.sms.params).to.has.property('mocean-dlr-mask');

        expect(this.sms.params).to.not.has.property('mocean-dlr-url');
        this.sms.setDlrUrl('test dlr url');
        expect(this.sms.params).to.has.property('mocean-dlr-url');

        expect(this.sms.params).to.not.has.property('mocean-schedule');
        this.sms.setSchedule('test schedule');
        expect(this.sms.params).to.has.property('mocean-schedule');

        expect(this.sms.params).to.not.has.property('mocean-alt-dcs');
        this.sms.setAltDcs('test alt dcs');
        expect(this.sms.params).to.has.property('mocean-alt-dcs');

        expect(this.sms.params).to.not.has.property('mocean-charset');
        this.sms.setCharset('test charset');
        expect(this.sms.params).to.has.property('mocean-charset');

        expect(this.sms.params).to.not.has.property('mocean-validity');
        this.sms.setValidity('test validity');
        expect(this.sms.params).to.has.property('mocean-validity');

        expect(this.sms.params).to.not.has.property('mocean-resp-format');
        this.sms.setRespFormat('JSON');
        expect(this.sms.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        sinon.stub(this.transmitterStub, 'send').returns('test');

        const sendCall = () => {
            this.sms.send();
            return true;
        };

        expect(this.sms.params).to.not.has.property('mocean-text');
        expect(sendCall).to.throw();
        this.sms.setText('test text');

        expect(this.sms.params).to.not.has.property('mocean-from');
        expect(sendCall).to.throw();
        this.sms.setFrom('test from');

        expect(this.sms.params).to.not.has.property('mocean-to');
        expect(sendCall).to.throw();
        this.sms.setTo('test to');

        expect(sendCall()).to.be.true;
    });

    it('should return callback on send', () => {
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        this.sms.setText('test text');
        this.sms.setFrom('test from');
        this.sms.setTo('test to');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            this.sms.send(null, fake);
        });
    });

    it('should return promise on send', () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        this.sms.setText('test text');
        this.sms.setFrom('test from');
        this.sms.setTo('test to');
        this.sms.send()
            .then(result => {
                expect(result).to.equal('promise resolve');
            });
    });
});
