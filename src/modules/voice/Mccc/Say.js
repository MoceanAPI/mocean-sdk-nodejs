const AbstractMccc = require('./AbstractMccc');

class Say extends AbstractMccc {
    constructor(params = null) {
        super(params);

        // default value
        this.requestData.language = this.requestData.language ? this.requestData.language : 'en-US';
    }

    setLanguage(param) {
        this.requestData.language = param;
        return this;
    }

    setText(param) {
        this.requestData.text = param;
        return this;
    }

    setBargeIn(param) {
        this.requestData['barge-in'] = param;
        return this;
    }

    static requiredKey() {
        return ['text', 'language'];
    }

    static action() {
        return 'say';
    }
}

module.exports = Say;
