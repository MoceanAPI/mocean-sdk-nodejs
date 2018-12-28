const http = require('https');
const fs = require('fs');
const queryString = require('querystring');
const EventEmitter = require('events');

class MoceanFactory {
    constructor(client) {
        this.params = {};
        this.params['mocean-api-key'] = client.params['mocean-api-key'];
        this.params['mocean-api-secret'] = client.params['mocean-api-secret'];
        this.required_fields = [];
    }

    create(params) {
        this.reset();
        this.params = Object.assign({}, this.params, params);
    }

    createFinalParams() {
        var newParams = {};
        var key = '';
        for (var i in this.params) {
            if (this.params[i].length != '' && this.params[i] != null) {
                key = i;
                //append prefix mocean- if not exist in key
                if (!key.match(/^mocean-/i)) {
                    key = 'mocean-' + i;
                }
                newParams[key] = this.params[i];
            }
        }
        this.params = newParams;
    }

    isRequiredFieldSets() {
        for (const i in this.required_fields) {
            if (typeof this.params[this.required_fields[i]] == 'undefined') {
                throw `${this.required_fields[i]} is mandatory field.`
            }
        }
        return true;
    }

    reset() {
        this.params = {
            'mocean-api-key': this.params['mocean-api-key'],
            'mocean-api-secret': this.params['mocean-api-secret']
        };
    }


}

class Transmitter {
    constructor(uri, method, params, callback) {
        this.domain = 'rest.moceanapi.com';
        this.port = '443';
        this.uri = uri;
        this.params = params;
        if (!this.params['mocean-medium']) {
            //set as nodejs sdk if
            this.params['mocean-medium'] = 'NODEJS-SDKS'
        }
        this.callback = callback;
        method = method.toLowerCase();
        this.header = {
            'User-Agent': 'curl',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        switch (method) {
            case 'get':
                this.__get();
                break;
            case 'post':
                this.__post();
                break;
            case 'put':
                this.__put();
                break;
            case 'delete':
                this.__delete();
                break;
            default:
                throw `Invalid request method ${method}, please contact SDK provider.`;
        }
    }

    __post() {
        var header = this.header;
        var postData = queryString.stringify(this.params);
        header['Content-Length'] = Buffer.byteLength(postData);
        var options = {
            host: this.domain,
            path: this.uri,
            port: this.port,
            method: 'POST',
            headers: header,

        };
        let callback = this.callback;
        var req = http.request(options, (res) => {
            res.setEncoding("UTF-8");
            let resBody = "";


            res.on('data', (chunk) => {
                resBody += chunk;
            });

            res.on('end', () => {
                callback('', resBody);

            });
        });
        req.on('error', (e) => {
            callback(e.message, '');
            // this.response = `Something wrong with request: ${e.message}`;
        });

        req.write(postData);
        req.end();
    }

    __get() {
        var header = this.header;
        var getData = queryString.stringify(this.params);

        var options = {
            host: this.domain,
            path: this.uri + `?${getData}`,
            port: this.port,
            method: 'GET',
            headers: header,

        };
        let callback = this.callback;
        var req = http.request(options, (res) => {
            res.setEncoding("UTF-8");
            let resBody = "";


            res.on('data', (chunk) => {
                resBody += chunk;
            });

            res.on('end', () => {
                callback('', resBody);

            });
        });
        req.on('error', (e) => {
            callback(`Something wrong with request: ${e.message}`, '');
        });

        req.end();
    }

    __put() {
        var header = this.header;
        var postData = queryString.stringify(this.params);
        header['Content-Length'] = Buffer.byteLength(postData);
        var options = {
            host: this.domain,
            path: this.uri,
            port: this.port,
            method: 'PUT',
            headers: header,

        };
        let callback = this.callback;
        var req = http.request(options, (res) => {
            res.setEncoding("UTF-8");
            let resBody = "";


            res.on('data', (chunk) => {
                resBody += chunk;
            });

            res.on('end', () => {
                callback('', resBody);

            });
        });
        req.on('error', (e) => {
            this.response = `Something wrong with request: ${e.message}`;
        });

        req.write(postData);
        req.end();
    }

    __delete() {
        var header = this.header;
        var postData = queryString.stringify(this.params);
        header['Content-Length'] = Buffer.byteLength(postData);
        var options = {
            host: this.domain,
            path: this.uri,
            port: this.port,
            method: 'DELETE',
            headers: header,

        };
        let callback = this.callback;
        var req = http.request(options, (res) => {
            res.setEncoding("UTF-8");
            let resBody = "";


            res.on('data', (chunk) => {
                resBody += chunk;
            });

            res.on('end', () => {
                callback('', resBody);

            });
        });
        req.on('error', (e) => {
            this.response = `Something wrong with request: ${e.message}`;
        });

        req.write(postData);
        req.end();
    }

    httpRes(res) {

    }

}

exports.MoceanFactory = MoceanFactory;
exports.Transmitter = Transmitter;
