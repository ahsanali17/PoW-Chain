const client = require('../client');

// invoke "stopMining function in index.js"
client.request('stopMining', [], function(err, response) {
	if(err) throw err;
	console.log(response.result); // success!
});