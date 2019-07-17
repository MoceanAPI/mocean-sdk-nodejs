const AbstractMccc = require('./Mccc/AbstractMccc');

class McccBuilder {
    constructor() {
        this.mccc = [];
    }

    add(mccc) {
        if (mccc instanceof AbstractMccc) {
            this.mccc.push(mccc);
            return this;
        }

        throw Error('invalid mccc');
    }

    build() {
        const converted = [];
        this.mccc.forEach((mcccObj) => {
            converted.push(mcccObj.get());
        });
        return converted;
    }
}

module.exports = McccBuilder;
