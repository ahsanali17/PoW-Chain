const client = require('../client');

// invoke "startMining function in index.js"
client.request('startMining', [], function(err, response) {
	if(err) throw err;
	console.log(response.result); // success!
});