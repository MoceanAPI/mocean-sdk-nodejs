const chai = require('chai');
const expect = chai.expect;
const { Mccc } = require('../../../src/index');
const {
    Say, Bridge, Collect, Play, Sleep
} = require('../../../src/modules/voice/Mccc/index');

describe('Mccc Test', () => {
    it('should create a say mccc', () => {
        let say = Mccc.say();
        expect(say).to.be.instanceOf(Say);

        say = Mccc.say('hello world');
        expect(say.get().text).to.eq('hello world');
    });

    it('should create a bridge mccc', () => {
        let bridge = Mccc.bridge();
        expect(bridge).to.be.instanceOf(Bridge);

        bridge = Mccc.bridge('testing to');
        expect(bridge.get().to).to.eq('testing to');
    });

    it('should create a collect mccc', () => {
        let collect = Mccc.collect();
        expect(collect).to.be.instanceOf(Collect);

        collect = Mccc.collect('testing url');
        expect(collect.get()['event-url']).to.eq('testing url');
    });

    it('should create a play mccc', () => {
        let play = Mccc.play();
        expect(play).to.be.instanceOf(Play);

        play = Mccc.play('testing file');
        expect(play.get().file).to.eq('testing file');
    });

    it('should create a sleep mccc', () => {
        let sleep = Mccc.sleep();
        expect(sleep).to.be.instanceOf(Sleep);

        sleep = Mccc.sleep(10000);
        expect(sleep.get().duration).to.eq(10000);
    });
});
