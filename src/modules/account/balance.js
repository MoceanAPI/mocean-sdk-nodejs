const {MoceanFactory,Transmitter} = require('../abstract');

class Balance extends MoceanFactory
{
    constructor(client)
    {
        super(client);
        this.required_fields = ['mocean-api-key','mocean-api-secret'];
    }
    
    setRespFormat(param)
    {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    inquiry(callback = (err,result)=>{}, params)
    {
        this.create(params);
        this.createFinalParams;
        this.isRequiredFieldSets;
        var response = new Transmitter('/rest/1/account/balance','get',this.params,callback);
        this.reset;
    }
}

module.exports = Balance;