const request = require('request');

class Transmitter {
    constructor(options) {
        this.options = Object.assign(Transmitter.defaultOptions(), options);
    }

    static defaultOptions() {
        return {
            baseUrl: 'https://rest.moceanapi.com',
            version: '1'
        };
    }

    get(uri, params, callback = null) {
        return this.send('get', uri, params, callback);
    }

    post(uri, params, callback = null) {
        return this.send('post', uri, params, callback);
    }

    send(method, uri, params, callback = null) {
        if (params['mocean-medium'] !== 'NODECLI-SDK') {
            // set as nodejs sdk if not nodecli
            params['mocean-medium'] = 'NODEJS-SDK';
        }

        // use json if default not set;
        if (!params['mocean-resp-format']) {
            params['mocean-resp-format'] = 'json';
        }

        const httpOptions = {
            baseUrl: this.options.baseUrl + '/rest/' + this.options.version,
            uri: uri,
            method: method,
            qs: method === 'get' ? params : {},
            form: method === 'post' ? params : {}
        };

        if (callback === null) {
            // return promise wrapper if no callback passed in
            return new Promise((resolve, reject) => {
                request(httpOptions, (err, res, body) => {
                    if (err) {
                        reject(err);
                    }

                    try {
                        const parsedBody = JSON.parse(body);
                        if (parsedBody.status && parsedBody.status !== 0 && parsedBody.status !== '0') {
                            reject(parsedBody.err_msg);
                        }

                        resolve(parsedBody);
                    } catch (e) {
                        // simple resolve xml response
                        resolve(body);
                    }
                });
            });
        }

        // expect to be callback base
        request(httpOptions, (err, res, body) => {
            if (err) {
                callback(err, null);
            }

            try {
                const parsedBody = JSON.parse(body);
                if (parsedBody.status && parsedBody.status !== 0) {
                    callback(parsedBody.err_msg, null);
                }

                callback(null, parsedBody);
            } catch (e) {
                // simple callback xml response
                callback(null, body);
            }
        });
    }
}

module.exports = Transmitter;
