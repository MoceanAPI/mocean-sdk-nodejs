const AbstractMccc = require('./AbstractMccc');

class Play extends AbstractMccc {
    constructor(params = null) {
        super(params);
    }

    setFiles(param) {
        this.requestData.file = param;
        return this;
    }

    setBargeIn(param) {
        this.requestData['barge-in'] = param;
        return this;
    }

    static requiredKey() {
        return ['file'];
    }

    static action() {
        return 'play';
    }
}

module.exports = Play;
