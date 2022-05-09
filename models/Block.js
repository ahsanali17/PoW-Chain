const SHA256 = require('crypto-js/sha256');

class Block {
  constructor() {
    this.timeStamp = Date.now();
    this.nonce = 0;
    this.transactions = [];
  }
  addTransaction(tx) {
    // The parameter is pushed into the transactions array defined in constructor
    this.transactions.push(tx);
  }
  // Hash function that returns a SHA256 string 
  hash(){
    return SHA256(
      this.timeStamp + "" + 
      this.nonce + "" + 
      JSON.stringify(this.transactions)
    ).toString();
  } 
  // Foreach tx inside this.transactions array execute this function recursively 
  execute() {
    this.transactions.forEach(x => x.execute());
  }
}

module.exports = Block;
