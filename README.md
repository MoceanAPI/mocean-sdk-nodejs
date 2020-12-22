MoceanAPI Client Library for NodeJS 
============================
[![npm version](https://img.shields.io/npm/v/mocean-sdk.svg)](https://www.npmjs.com/package/mocean-sdk)
[![build status](https://img.shields.io/travis/com/MoceanAPI/mocean-sdk-nodejs.svg)](https://travis-ci.com/MoceanAPI/mocean-sdk-nodejs)
[![codacy](https://img.shields.io/codacy/grade/988872ff78ee4429a1780aa6359886a0.svg)](https://app.codacy.com/project/MoceanAPI/mocean-sdk-nodejs/dashboard)
[![license](https://img.shields.io/npm/l/mocean-sdk.svg)](https://www.npmjs.com/package/mocean-sdk)
[![total downloads](https://img.shields.io/npm/dt/mocean-sdk.svg)](https://www.npmjs.com/package/mocean-sdk)  

This is the NodeJS client library for use Mocean's API. To use this, you'll need a Mocean account. Sign up [for free at 
moceanapi.com][signup].

 * [Installation](#installation)
 * [Usage](#usage)
 * [Example](#example)

## Installation

To use the client library you'll need to have [created a Mocean account][signup]. 

To install the NodeJS client library using Node Package Manager (NPM).

```bash
npm install mocean-sdk
```

## Usage

Create a client with your API key and secret:

```javascript
const client = require('mocean-sdk');

var token = new client.Client('API_KEY_HERE','API_SECRET_HERE');
var mocean = new client.Mocean(token);
```

## Example

To use [Mocean's SMS API][doc_sms] to send an SMS message, call the `mocean.sms.send()` method.

The API can be called directly, using a simple array of parameters, the keys match the [parameters of the API][doc_sms].

```javascript
mocean.sms()
    .send({
        'mocean-from': 'MOCEAN',
        'mocean-to': '60123456789',
        'mocean-text': 'Hello World'
    }, function(err, res) {
        if (err) throw err;

        console.log(res);
    });
```

### Extras

This library support both `callbacks` and `promises`  
To use `callbacks`, simple pass the callback function in second parameter like example above  
For `promises`, refer to the example below
```javascript
const promise = mocean.sms()
    .send({
        'mocean-from': 'MOCEAN',
        'mocean-to': '60123456789',
        'mocean-text': 'Hello World'
    });

promise.then(res => {
    console.log(res);
});

promise.catch(err => {
    throw err;
});
```

## Documentation

Kindly visit [MoceanApi Docs][doc_main] for more usage

License
-------

This library is released under the [MIT License][license]

[signup]: https://dashboard.moceanapi.com/register?medium=github&campaign=nodejs-sdk
[doc_main]: https://moceanapi.com/docs/?javascript
[doc_sms]: https://moceanapi.com/docs/?javascript#send-sms
[license]: LICENSE.txt
