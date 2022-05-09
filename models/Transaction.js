const {utxos} = require('../db');

class Transaction {
	constructor(inputs, outputs ) {
		this.inputs = inputs;
		this.outputs = outputs;
	}
	execute() {
		// Foreach input received set the value of spent to true
		this.inputs.forEach((input) => {
			input.spent = true;
		});
		// Foreach output push it into the utxo
		this.outputs.forEach((output) => {
			utxos.push(output);
		});
		
	}
}

module.exports = Transaction;