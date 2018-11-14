const {MoceanFactory,Transmitter} = require('../abstract');

class Pricing extends MoceanFactory
{
    constructor(client)
    {
        super(client);
        this.required_fields = ['mocean-api-key','mocean-api-secret'];
    }

    setMcc(param)
    {
        this.params['mocean-mcc'] = param;
        return this;
    }

    setMnc(param)
    {
        this.params['mocean-mnc'] = param;
        return this;
    }

    setDelimiter(param)
    {
        this.params['mocean-delimiter'] = param;
        return this;
    }

    setRespFormat(param)
    {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    inquiry(callback = (err,result) => {},params)
    {
        this.params = Object.assign({},this.params,params);
        this.createFinalParams;
        this.isRequiredFieldSets;
        var response = new Transmitter('/rest/1/account/pricing','get',this.params,callback);
        this.reset;
    }
}

module.exports = Pricing;