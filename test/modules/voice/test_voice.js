const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const { Client, Mocean } = require('../../../src/index');
const Transmitter = require('../../../src/modules/Transmitter');

describe('Voice Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new Client(apiKey, apiSecret);
        this.mocean = new Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.voice = this.mocean.voice();
    });

    it('should set params through setter', () => {
        expect(this.voice.params).to.not.has.property('mocean-to');
        this.voice.setTo('test to');
        expect(this.voice.params).to.has.property('mocean-to');

        expect(this.voice.params).to.not.has.property('mocean-call-event-url');
        this.voice.setCallEventUrl('test call event url');
        expect(this.voice.params).to.has.property('mocean-call-event-url');

        expect(this.voice.params).to.not.has.property('mocean-call-control-commands');
        this.voice.setCallControlCommands('test call control commands');
        expect(this.voice.params).to.has.property('mocean-call-control-commands');

        expect(this.voice.params).to.not.has.property('mocean-resp-format');
        this.voice.setRespFormat('JSON');
        expect(this.voice.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        sinon.stub(this.transmitterStub, 'send').returns('test');

        const voiceCall = () => {
            this.voice.call();
            return true;
        };

        expect(this.voice.params).to.not.has.property('mocean-to');
        expect(voiceCall).to.throw();
        this.voice.setTo('test to');

        expect(voiceCall()).to.be.true;
    });

    it('should return callback on call', () => {
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        this.voice.setTo('test to');
        return new Promise((resolve) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            this.voice.call(null, fake);
        });
    });

    it('should return promise on call', () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        this.voice.setTo('test to');
        this.voice.call()
            .then(result => {
                expect(result).to.equal('promise resolve');
            });
    });
});
