MoceanAPI Client Library for NodeJS 
============================

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
[doc_sms]: https://docs.moceanapi.com/?javascript#send-sms
[doc_inbound]: https://docs.moceanapi.com/?javascript#receive-sms
[doc_verify]: https://docs.moceanapi.com/?javascript#overview-3
[license]: LICENSE.txt