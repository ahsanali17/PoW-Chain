const client = require('../client');
const {argv} = require('yargs');
const {address} = argv;

console.log(argv);

// invoke "getBalance function in index.js"
client.request('getBalance', [address], function(err, response) {
	if(err) throw err;
	console.log(response.result); // Miners balance!
});