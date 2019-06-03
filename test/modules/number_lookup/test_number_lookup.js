const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');
const Transmitter = require('../../../src/modules/Transmitter');

describe('Number Lookup Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new client.Client(apiKey, apiSecret);
        this.mocean = new client.Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.numberLookup = this.mocean.number_lookup();
    });

    it('should set params through setter', () => {
        expect(this.numberLookup.params).to.not.has.property('mocean-to');
        this.numberLookup.setTo('test to');
        expect(this.numberLookup.params).to.has.property('mocean-to');

        expect(this.numberLookup.params).to.not.has.property('mocean-nl-url');
        this.numberLookup.setNlUrl('test nl url');
        expect(this.numberLookup.params).to.has.property('mocean-nl-url');

        expect(this.numberLookup.params).to.not.has.property('mocean-resp-format');
        this.numberLookup.setRespFormat('JSON');
        expect(this.numberLookup.params).to.has.property('mocean-resp-format');
    });

    it('should throw error when required field not set', () => {
        sinon.stub(this.transmitterStub, 'send').returns('test');

        const inquiryCall = () => {
            this.numberLookup.inquiry();
            return true;
        };

        expect(this.numberLookup.params).to.not.has.property('mocean-to');
        expect(inquiryCall).to.throw();
        this.numberLookup.setTo('test to');

        expect(inquiryCall()).to.be.true;
    });

    it('should return callback on inquiry', () => {
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        this.numberLookup.setTo('test to');
        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.calledOnce;
                resolve();
            });
            this.numberLookup.inquiry(null, fake);
        });
    });

    it('should return promise on inquiry', () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        this.numberLookup.setTo('test to');
        this.numberLookup.inquiry()
            .then(result => {
                expect(result).to.equal('promise resolve');
            });
    });
});
