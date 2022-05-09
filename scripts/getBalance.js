const client = require('../client');
const {PUBLIC_KEY} = require('../config');

// invoke "getBalance function in index.js"
client.request('getBalance', [PUBLIC_KEY], function(err, response) {
	if(err) throw err;
	console.log(response.result); // Miners balance!
});