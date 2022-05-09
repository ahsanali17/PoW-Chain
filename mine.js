const Block = require('./models/Block.js');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const db = require('./db');
const {PUBLIC_KEY} = require('./config');
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const BLOCK_REWARD = 10;

// If set to true mining will begin as soon as client starts, if false it will not begin mining
let mining = true;
mine();
// Function that starts mining for us
function startMining() {
	mining = true;
	mine();
}

// function that stops mining for us
function stopMining() {
	mining = false;
}

function mine() {
	// If mining is false then return meaning don't start the mining process
	if(!mining) return;
	
	// Set the value of block to a new instantiated Block object
	const block = new Block();
	
	// Create a new UTXO object with OWNER: as the public_key & AMOUNT: as the block_reward
	const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
	// Create a new TRANSACTION object with INPUTS: as an empty array & OUTPUTS: an array storing coinbaseUTXO
	const coinbaseTX = new Transaction([], [coinbaseUTXO]);
	// Add coinbaseTX as 'tx', this function pushes tx into the transactions array in our block object
	block.addTransaction(coinbaseTX);
	
	// While the block hash is greater than or equal to the target, increase the nonce
	while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
		block.nonce++;
	}
	
	// Run the function execute on block object that checks foreach tx inside transactions array
	block.execute();

	// Add block using the blockchain.addBlock function to push it into the blocks array 
	db.blockchain.addBlock(block);
	// Return us this message
	console.log(`Just mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);
	// Controls the time it takes for the next block to be mined at
	setTimeout(mine, 2500);
}

module.exports = {startMining, stopMining};
