const request = require('request');

class Transmitter {
    constructor(options) {
        this.options = Object.assign(Transmitter.defaultOptions(), options);
    }

    static defaultOptions() {
        return {
            baseUrl: 'https://rest.moceanapi.com',
            version: '2'
        };
    }

    get(uri, params, callback = null) {
        return this.send('get', uri, params, callback);
    }

    post(uri, params, callback = null) {
        return this.send('post', uri, params, callback);
    }

    send(method, uri, params, callback = null) {
        const clonedParams = Object.assign({}, params);
        if (clonedParams['mocean-medium'] !== 'NODECLI-SDK') {
            // set as nodejs sdk if not nodecli
            clonedParams['mocean-medium'] = 'NODEJS-SDK';
        }

        // use json if default not set;
        if (!clonedParams['mocean-resp-format']) {
            clonedParams['mocean-resp-format'] = 'json';
        }

        const httpOptions = {
            baseUrl: this.options.baseUrl + '/rest/' + this.options.version,
            uri: uri,
            method: method,
            qs: method === 'get' ? clonedParams : {},
            form: method === 'post' ? clonedParams : {}
        };

        if (callback === null) {
            // return promise wrapper if no callback passed in
            return new Promise((resolve, reject) => {
                request(httpOptions, (err, res, body) => {
                    if (err) {
                        return reject(err);
                    }

                    try {
                        const parsedBody = JSON.parse(body);
                        if (parsedBody.status && parsedBody.status !== 0 && parsedBody.status !== '0') {
                            return reject(parsedBody.err_msg);
                        }

                        return resolve(parsedBody);
                    } catch (e) {
                        // simple resolve xml response
                        return resolve(body);
                    }
                });
            });
        }

        // expect to be callback base
        request(httpOptions, (err, res, body) => {
            if (err) {
                return callback(err, null);
            }

            try {
                const parsedBody = JSON.parse(body);
                if (parsedBody.status && parsedBody.status !== 0) {
                    return callback(parsedBody.err_msg, null);
                }

                return callback(null, parsedBody);
            } catch (e) {
                // simple callback xml response
                return callback(null, body);
            }
        });
    }
}

module.exports = Transmitter;
