const jayson = require('jayson');
const {startMining, stopMining} = require('./mine');
const {PORT} = require('./config');
const {utxos} = require('./db');

// create a server
const server = new jayson.Server({
  // Run the startMining script
  startMining: function(_, callback) {
    callback(null, 'Beginning mining process!');
    startMining();
  },
  // Run the stopMining script
  stopMining: function(_, callback) {
    callback(null, 'Mining has halted!');
    stopMining();
  },
  // Run the getBalance script
  getBalance: function([address], callback) {
    // We filter through our UTXOs and have it return the owner if it equals the current address and if its spent value is true
    const ourUTXOs = utxos.filter(x => { 
      return x.owner === address && !x.spent
    });
    // We console log the utxo's by first mapping each utxo to an owner and the current owner address
    console.log(utxos.map(x => x.owner), address);
    // The sum is equal to owner + amount, defaultValue is set to 0
    const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);
    callback(null, sum);
  }
});

server.http().listen(PORT);
