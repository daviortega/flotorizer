'use strict'

const express = require('express'),
	path = require('path'),
	fs = require('fs')

const flotorize = require('./src/flotorize.js').flotorize

const app = express()

let username = process.env.FLOWALLET_USERNAME,
	password = process.env.FLOWALLET_PASSWORD,
	address1 = process.env.FLOWALLET_ADDRESS1,
	address2 = process.env.FLOWALLET_ADDRESS2

let WalletOperations = require('./src/walletOperations.js')

let wallet = new WalletOperations(username, password, address1, address2)
wallet.init()

app.get('/flotorize', function(req, res) {
	console.log('got the request')
	let hash = req.param('hs'),
		filename = req.param('f')

	console.log('File: ' + filename)
	console.log('Hash: ' + hash)
	flotorize(filename, hash, wallet).then(function(pdfFilename) {
		//let newname = 'output.pdf'
		let pdfPath = path.resolve(__dirname, 'scratch', pdfFilename)
		console.log('pdf is ready')
		console.log(pdfFilename)
		res.download(pdfPath, pdfFilename, function(err) {
			if (err) {
				console.log('Error: ')
				console.log(err)
			}
			else {
				fs.unlink(pdfPath, (error) => {
					if (err) throw error
					console.log('successfully deleted')
				})
			}
		})
	})
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'assets')))

let port = process.env.PORT || 3000

app.listen(port, function () {
	console.log('Example app listening on port ' + port)
})
