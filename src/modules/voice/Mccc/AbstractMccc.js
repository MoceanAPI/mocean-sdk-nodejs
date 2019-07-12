class AbstractMccc {
    constructor(params = null) {
        this.requestData = {};

        if (params !== null) {
            this.requestData = Object.assign({}, params);
        }
    }

    get() {
        if (typeof this.constructor.action !== 'function') {
            throw Error('function action is not defined');
        }

        if (typeof this.constructor.requiredKey === 'function') {
            for (const i in this.constructor.requiredKey()) {
                if (typeof this.requestData[this.constructor.requiredKey()[i]] === 'undefined') {
                    throw Error(`${this.constructor.requiredKey()[i]} is mandatory field.`);
                }
            }
        }

        this.requestData.action = this.constructor.action();
        return this.requestData;
    }
}

module.exports = AbstractMccc;
