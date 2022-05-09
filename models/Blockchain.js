const block = require('./Block');

class Blockchain {
  constructor() {
    this.blocks = [];
  }
  addBlock() {
    this.blocks.push(block);
  }
  // We look at a blockchain from how tall it is so we refer to it by how many blocks exist in the chain so we use the .length to find that
  blockHeight() {
    return this.blocks.length;
  }
}

module.exports = Blockchain;
