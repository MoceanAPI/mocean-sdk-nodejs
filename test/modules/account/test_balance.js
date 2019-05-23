const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
const client = require('../../../src/app');
const Transmitter = require('../../../src/modules/Transmitter');

describe('Balance Test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
        const apiKey = 'testapikey';
        const apiSecret = 'testapisecret';
        const credentials = new client.Client(apiKey, apiSecret);
        this.mocean = new client.Mocean(credentials, {
            transmitter: this.transmitterStub
        });
        this.balance = this.mocean.balance();
    });

    it('should set response format through setter', () => {
        expect(this.balance.params).to.not.has.property('mocean-resp-format');

        this.balance.setRespFormat('JSON');
        expect(this.balance.params).to.has.property('mocean-resp-format');
    });

    it('should return callback on inquiry', () => {
        sinon.stub(this.transmitterStub, 'send').callsArg(3);

        return new Promise((resolve, reject) => {
            const fake = sinon.fake(() => {
                expect(fake).has.been.called;
                resolve();
            });
            this.balance.inquiry(fake);
        });
    });

    it('should return promise on inquiry', async () => {
        sinon.stub(this.transmitterStub, 'send').resolves('promise resolve');

        const result = await this.balance.inquiry();
        expect(result).to.equal('promise resolve');
    });
});
