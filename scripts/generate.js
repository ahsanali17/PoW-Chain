const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();

// The console will generate us our current configs private and public key
console.log({
 privateKey: key.getPrivate().toString(16),
 publicKey: key.getPublic().encode('hex'),
});
