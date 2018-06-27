const {MoceanFactory,Transmitter} = require("../abstract");

class Sms extends MoceanFactory
{
    constructor(client)
    {
        super(client);
        this.required_fields['mocean-api-key','mocean-api-secret','mocean-text','mocean-from','mocean-to']; 
        this.flashSms = false;
    }


    setFrom(param)
    {
        this.params['mocean-from'] = param;
        return this;
    }

    setTo(param)
    {
        this.params['mocean-to'] = param;
        return this;
    }
    
    setText(param)
    {
        this.params['mocean-text'] = param;
        return this;
    }

    setUdh(param)
    {
        this.params['mocean-udh'] = param;
        return this;
    }

    setCoding(param)
    {
        this.params['mocean-coding'] = param;
        return this;
    }

    setDlrMask(param)
    {
        this.params['mocean-dlr-mask'] = param;
        return this;
    }

    setDlrUrl(param)
    {
        this.params['mocean-dlr-url'] = param;
        return this;
    }

    setSchedule(param)
    {
        this.params['mocean-schedule'] = param;
        return this;
    }

    setMclass(param)
    {
        this.params['mocean-mclass'] = param;
        return this;
    }

    setAltDcs(param)
    {
        this.params['mocean-alt-dcs'] = param;
        return this;
    }

    setCharset(param)
    {
        this.params['mocean-charset'] = param;
        return this;
    }

    setValidity(param)
    {
        this.params['mocean-validity'] = param;
        return this;
    }

    setRespFormat(param)
    {
        this.params['mocean-resp-format'] = param;
        return this;
    }
    addTo(param)
    {
        if(typeof this.params['mocean-to'] != "undefined" && this.params['mocean-to'] != null)
        {
            this.params['mocean-to'] += `,${param}`;
        }
        else
        {
            this.params['mocean-to'] = param;
        }
        return this;
    }

    create(param)
    {   
        this.reset;
        super.create(param)
        return this;
    }

    send(callback = (err,result)=>{})
    {
        if(this.flashSms == true)
        {
            this.params['mocean-mclass'] = '1';
            this.params['mocean-alt-dcs'] = '1';
        }
        this.createFinalParams();
        this.isRequiredFieldSets();
        var response = new Transmitter('/rest/1/sms','post',this.params,callback);
    }

}

module.exports = Sms;