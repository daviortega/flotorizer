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
const AH = require('./src/AlexandriaHelper')

app.get('/stats', function(req, res, next) {
	wallet.wallet.then((carteira) => {
		const ah = new AH()
		ah.getTotalFlotorizations().then((numOfFlotorizations) => {
			res.send(numOfFlotorizations.toString())
			next()
		})
	})
})

app.get('/flotorize', function(req, res) {
	console.log('got the request')
	let hash = req.param('hs'),
		filename = req.param('f')

	console.log('File: ' + filename)
	console.log('Hash: ' + hash)

	const ah = new AH()
	console.log('Is it in the blockchain?')
	ah.isInBlockChain(hash).then((result) => {
		if (!result.exists) {
			console.log('No! Let\'s make that happen')
			flotorize(filename, hash, wallet).then(function(pdfFilename) {
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
		}
		else {
			let sorryHtml = '<p>Yo, this transaction is already in the blockchain, cool huh?<p>'
			sorryHtml += '<p>Hash: ' + hash + '</p>'
			sorryHtml += '<p>Transaction: <a href=\'https://florincoin.info/tx/' + result.addr + '\'>' + result.addr + '</a></p>'
			sorryHtml += '<p><a href=\'https://flotorizer.net\'>Try another file</a></p>'
			console.log('Yup... let\'s tell them')
			res.send(sorryHtml)
		}
	})
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'assets')))

let port = process.env.PORT || 3000

app.listen(port, function () {
	console.log('Example app listening on port ' + port)
})
