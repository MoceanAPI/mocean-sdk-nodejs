MoceanAPI Client Library for NodeJS 
============================
[![npm version](https://img.shields.io/npm/v/mocean-sdk.svg)](https://www.npmjs.com/package/mocean-sdk)
[![node version](https://img.shields.io/node/v/mocean-sdk.svg)](https://www.npmjs.com/package/mocean-sdk)
[![build status](https://img.shields.io/travis/com/MoceanAPI/mocean-sdk-nodejs.svg)](https://travis-ci.com/MoceanAPI/mocean-sdk-nodejs)
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
const client = require('mocean');

var token = new client.Client('API_KEY_HERE','API_SECRET_HERE');
var mocean = new client.Mocean(token);
```

## Example

To use [Mocean's SMS API][doc_sms] to send an SMS message, call the `mocean.sms.create().send()` method.

The API can be called directly, using a simple array of parameters, the keys match the [parameters of the API][doc_sms].

```javascript
mocean.sms().create({
  from: 'MOCEAN',
  to: '60123456789',
  text: 'Hello World'
}).send((err, res) => {
  if(err) throw err;
  
  console.log(res);
});

```


License
-------

This library is released under the [MIT License][license]

[signup]: https://dashboard.moceanapi.com/register?medium=github&campaign=sdk-javascript
[doc_sms]: https://moceanapi.com/docs/?javascript#send-sms
[doc_inbound]: https://moceanapi.com/docs/?javascript#receive-sms
[doc_verify]: https://moceanapi.com/docs/?javascript#verify-api
[license]: LICENSE.txt
