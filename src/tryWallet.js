'use strict'
const path = require('path')

const flotorize = require('./flotorize.js').flotorize

let WalletOperations = require('./walletOperations.js')

let wallet = new WalletOperations('5b2241e-73b9369e-32279b7-97f3210', 'z2fug*0Zb$4Y')
wallet.init()

let filename = 'this.pdf',
	hash = Math.random()

flotorize(filename, hash, wallet).then(function(pdfFilename, err) {
	//let newname = 'output.pdf'
	if (err) {
		console.log('Error:::::::')
		console.log(err)
	}
	let pdfPath = path.resolve(__dirname, pdfFilename)
	console.log('pdf is ready')
	console.log(pdfFilename)
	console.log(hash)
})
