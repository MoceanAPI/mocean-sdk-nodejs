const chai = require('chai');
const expect = chai.expect;
const { Bridge } = require('../../../../src/modules/voice/Mccc/index');

describe('Bridge Test', () => {
    it('should return mccc object', () => {
        const params = {
            to: 'testing to',
            action: 'dial'
        };
        let bridge = new Bridge(params);

        expect(params).to.deep.eq(bridge.get());

        bridge = new Bridge();
        bridge.setTo('testing to');

        expect(params).to.deep.eq(bridge.get());
    });

    it('should auto define action', () => {
        const params = {
            to: 'testing to'
        };
        const bridge = new Bridge(params);

        expect(bridge.get().action).to.eq('dial');
    });

    it('should throw if required field not set', () => {
        expect(() => {
            new Bridge().get();
        }).to.throw();
    });
});
