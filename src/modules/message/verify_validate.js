const {MoceanFactory,Transmitter} = require('../abstract');

class Verify_validate extends MoceanFactory
{
    constructor(client)
    {
        super(client);
        this.required_fields = ['mocean-api-key','mocean-api-secret','mocean-reqid','mocean-otp-code'];
    }

    setReqid(param)
    {
        this.params['mocean-reqid'] = param;
        return this;
    }
    
    setOtpCode(param)
    {
        this.params['mocean-otp-code'] = param;
        return this;
    }

    setRespFormat(param)
    {
        this.params['mocean-resp-format'] = param;
        return this;
    }

    create(params = {})
    {
        super.create(params);
        return this;
    }

    send(callback = (err,result)=>{})
    {
        this.createFinalParams;
        this.isRequiredFieldSets;
        var response = new Transmitter('/rest/1/verify/check','post',this.params,callback);
    }

}

module.exports = Verify_validate;