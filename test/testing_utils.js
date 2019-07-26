const nock = require('nock');

module.exports = {
    makeMockRequest(fileName, uri, method = 'GET', version = '2') {
        nock('https://rest.moceanapi.com')
            .intercept(`/rest/${version}${uri}`, method)
            .query(true)
            .once()
            .replyWithFile(200, `${__dirname}/resources/${fileName}`, { 'Content-Type': 'application/json' });
    }
};
