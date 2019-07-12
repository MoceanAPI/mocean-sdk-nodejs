const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const { Client, Mocean } = require('../../../src/index');
const Transmitter = require('../../../src/modules/Transmitter');

describe('Verify Validate Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new Client(apiKey, apiSecret);
        this.mocean = new Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.verifyValidate = this.mocean.verify_validate();
    });

    it('should set params through setter', () => {
        expect(this.verifyValidate.params).to.not.has.property('mocean-reqid');
        this.verifyValidate.setReqid('test req id');
        expect(this.verifyValidate.params).to.has.property('mocean-reqid');

        expect(this.verifyValidate.params).to.not.has.property('mocean-code');
        this.verifyValidate.setCode('test code');
        expect(this.verifyValidate.params).to.has.property('mocean-code');

        expect(this.verifyValidate.params).to.not.has.property('mocean-resp-format');
        this.verifyValidate.setRespFormat('JSON');
        expect(this.verifyValidate.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        sinon.stub(this.transmitterStub, 'send').returns('test');

        const sendCall = () => {
            this.verifyValidate.send();
            return true;
        };

        expect(this.verifyValidate.params).to.not.has.property('mocean-reqid');
        expect(sendCall).to.throw();
        this.verifyValidate.setReqid('test req id');

        expect(this.verifyValidate.params).to.not.has.property('mocean-code');
        expect(sendCall).to.throw();
        this.verifyValidate.setCode('test code');

        expect(sendCall()).to.be.true;
    });

    it('should return callback on send', () => {
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        this.verifyValidate.setReqid('test req id');
        this.verifyValidate.setCode('test code');
        return new Promise((resolve) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            this.verifyValidate.send(null, fake);
        });
    });

    it('should return promise on send', () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        this.verifyValidate.setReqid('test req id');
        this.verifyValidate.setCode('test code');
        this.verifyValidate.send()
            .then(result => {
                expect(result).to.equal('promise resolve');
            });
    });
});
