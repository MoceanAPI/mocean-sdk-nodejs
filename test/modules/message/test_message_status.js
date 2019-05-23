const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');
const Transmitter = require('../../../src/modules/Transmitter');

describe('Message Status Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new client.Client(apiKey, apiSecret);
        this.mocean = new client.Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.messageStatus = this.mocean.message_status();
    });

    it('should set params through setter', () => {
        expect(this.messageStatus.params).to.not.has.property('mocean-msgid');
        this.messageStatus.setMsgid('test msg id');
        expect(this.messageStatus.params).to.has.property('mocean-msgid');

        expect(this.messageStatus.params).to.not.has.property('mocean-resp-format');
        this.messageStatus.setRespFormat('JSON');
        expect(this.messageStatus.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        sinon.stub(this.transmitterStub, 'send').returns('test');

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
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        this.messageStatus.setMsgid('test msg id');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            this.messageStatus.inquiry(fake);
        });
    });

    it('should return promise on inquiry', () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        this.messageStatus.setMsgid('test msg id');
        this.messageStatus.inquiry()
            .then(result => {
                expect(result).to.equal('promise resolve');
            });
    });
});
