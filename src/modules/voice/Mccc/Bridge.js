const AbstractMccc = require('./AbstractMccc');

class Bridge extends AbstractMccc {
    constructor(params = null) {
        super(params);
    }

    setTo(param) {
        this.requestData.to = param;
        return this;
    }

    static requiredKey() {
        return ['to'];
    }

    static action() {
        return 'dial';
    }
}

module.exports = Bridge;
