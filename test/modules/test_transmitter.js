const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const Transmitter = require('../../src/modules/Transmitter');

describe('Transmitter test', () => {
    beforeEach(() => {
        this.transmitterStub = new Transmitter();
    });

    it('should return callback on send', (done) => {
        sinon.stub(this.transmitterStub, 'makeRequest').resolves({ status: 'ok' });
        const fake = sinon.fake((err, res) => {
            try {
                expect(fake).has.been.calledOnce;
                expect(res.status).to.eq('ok');
            } catch (e) {
                return done(e);
            }
            return done();
        });

        this.transmitterStub.send('get', '/test', { test: 'test' }, fake);
    });

    it('should return err callback on send', (done) => {
        sinon.stub(this.transmitterStub, 'makeRequest').rejects({ status: 'err' });
        const fake = sinon.fake((err) => {
            try {
                expect(fake).has.been.calledOnce;
                expect(err.status).to.eq('err');
            } catch (e) {
                return done(e);
            }
            return done();
        });

        this.transmitterStub.send('get', '/test', { test: 'test' }, fake);
    });

    it('should return promise on send', () => {
        sinon.stub(this.transmitterStub, 'makeRequest').resolves({ status: 'ok' });
        return this.transmitterStub.send('get', '/test', { test: 'test' })
            .then(res => {
                expect(res.status).to.eq('ok');
            });
    });

    it('should return error promise on send', () => {
        sinon.stub(this.transmitterStub, 'makeRequest').rejects({ status: 'err' });
        return this.transmitterStub.send('get', '/test', { test: 'test' })
            .catch(err => {
                expect(err.status).to.eq('err');
            });
    });
});
