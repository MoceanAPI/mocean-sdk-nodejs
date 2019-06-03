const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');
const Transmitter = require('../../../src/modules/Transmitter');

describe('Verify Request Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new client.Client(apiKey, apiSecret);
        this.mocean = new client.Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.verifyRequest = this.mocean.verify_request();
    });

    it('should set params through setter', () => {
        expect(this.verifyRequest.params).to.not.has.property('mocean-brand');
        this.verifyRequest.setBrand('test brand');
        expect(this.verifyRequest.params).to.has.property('mocean-brand');

        expect(this.verifyRequest.params).to.not.has.property('mocean-from');
        this.verifyRequest.setFrom('test from');
        expect(this.verifyRequest.params).to.has.property('mocean-from');

        expect(this.verifyRequest.params).to.not.has.property('mocean-to');
        this.verifyRequest.setTo('test to');
        expect(this.verifyRequest.params).to.has.property('mocean-to');

        expect(this.verifyRequest.params).to.not.has.property('mocean-code-length');
        this.verifyRequest.setCodeLength('test code length');
        expect(this.verifyRequest.params).to.has.property('mocean-code-length');

        expect(this.verifyRequest.params).to.not.has.property('mocean-pin-validity');
        this.verifyRequest.setPinValidity('test pin validity');
        expect(this.verifyRequest.params).to.has.property('mocean-pin-validity');

        expect(this.verifyRequest.params).to.not.has.property('mocean-next-event-wait');
        this.verifyRequest.setNextEventWait('test next event wait');
        expect(this.verifyRequest.params).to.has.property('mocean-next-event-wait');

        expect(this.verifyRequest.params).to.not.has.property('mocean-reqid');
        this.verifyRequest.setReqId('test req id');
        expect(this.verifyRequest.params).to.has.property('mocean-reqid');

        expect(this.verifyRequest.params).to.not.has.property('mocean-resp-format');
        this.verifyRequest.setRespFormat('JSON');
        expect(this.verifyRequest.params).to.has.property('mocean-resp-format');
    });

    it('should send as sms channel', () => {
        sinon.stub(this.transmitterStub, 'send').onCall(0).callsFake((method, uri) => {
            expect(method).to.equal('post');
            expect(uri).to.equal('/verify/req/sms');
        });

        this.verifyRequest.sendAs('sms');
        expect(this.verifyRequest.channel).to.equal('sms');

        this.verifyRequest.setTo('test to');
        this.verifyRequest.setBrand('test brand');
        this.verifyRequest.send();
    });

    it('should resend verify request when requested', () => {
        this.verifyRequest = this.mocean.verify_request(true);

        sinon.stub(this.transmitterStub, 'send').onCall(0).callsFake((method, uri) => {
            expect(method).to.equal('post');
            expect(uri).to.equal('/verify/resend/sms');
        });

        this.verifyRequest.setReqId('test req id');
        this.verifyRequest.resend();
    });

    it('should throw error when required field not set', () => {
        sinon.stub(this.transmitterStub, 'send').returns('test');

        const sendCall = () => {
            this.verifyRequest.send();
            return true;
        };

        expect(this.verifyRequest.params).to.not.has.property('mocean-to');
        expect(sendCall).to.throw();
        this.verifyRequest.setTo('test to');

        expect(this.verifyRequest.params).to.not.has.property('mocean-brand');
        expect(sendCall).to.throw();
        this.verifyRequest.setBrand('test brand');

        expect(sendCall()).to.be.true;
    });

    it('should return callback on send', () => {
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        this.verifyRequest.setTo('test to');
        this.verifyRequest.setBrand('test brand');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            this.verifyRequest.send(null, fake);
        });
    });

    it('should return promise on send', () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        this.verifyRequest.setTo('test to');
        this.verifyRequest.setBrand('test brand');
        this.verifyRequest.send()
            .then(result => {
                expect(result).to.equal('promise resolve');
            });
    });
});
