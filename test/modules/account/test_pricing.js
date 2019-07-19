const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const { Client, Mocean } = require('../../../src/index');
const Transmitter = require('../../../src/modules/Transmitter');

describe('Pricing Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new Client(apiKey, apiSecret);
        this.mocean = new Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.pricing = this.mocean.pricing_list();
    });

    it('should set params through setter', () => {
        expect(this.pricing.params).to.not.has.property('mocean-mcc');
        this.pricing.setMcc('test mcc');
        expect(this.pricing.params).to.has.property('mocean-mcc');

        expect(this.pricing.params).to.not.has.property('mocean-mnc');
        this.pricing.setMnc('test mnc');
        expect(this.pricing.params).to.has.property('mocean-mnc');

        expect(this.pricing.params).to.not.has.property('mocean-delimiter');
        this.pricing.setDelimiter('test delimiter');
        expect(this.pricing.params).to.has.property('mocean-delimiter');

        expect(this.pricing.params).to.not.has.property('mocean-resp-format');
        this.pricing.setRespFormat('JSON');
        expect(this.pricing.params).to.has.property('mocean-resp-format');
    });

    it('should return callback on inquiry', () => {
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        return new Promise((resolve) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            this.pricing.inquiry(null, fake);
        });
    });

    it('should return promise on inquiry', () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        return this.pricing.inquiry()
            .then(result => {
                expect(result).to.equal('promise resolve');
            });
    });
});
