'use strict'

const PDFDocument = require('pdfkit')
const path = require('path')
const fs = require('fs')
const qr = require('qr-image')
const jsonPackage = require('../package.json')

const defaultValue = 0.001

exports.flotorize = function(filename, hashString, coin) {
	return new Promise(function(res, rej) {
		let msg = 'This document has been flotorized: ' + hashString
		const address = coin.getMainAddress().getPublicAddress()
		console.log(`FLO address is: ${address}`)
		const to = {}
		to[address] = defaultValue
		coin.sendPayment({
			to,
			floData: msg,
			coin: 'flo'
		}).then((txid) => {
			const data = txid
			console.log('it worked')
			let pdfFilename = 'Flotorizer.' + filename
			if (pdfFilename.match('.pdf$') === null)
				pdfFilename += '.pdf'
			let pdfPath = path.resolve(__dirname, '../scratch', pdfFilename)
			let tempOutput = fs.createWriteStream(pdfPath)
			console.log(filename)

			let doc = new PDFDocument()
			console.log('just created the instance')

			doc
				.scale(1)
				.fontSize(30)
				.text(`Flotorizer ${jsonPackage.version}-beta`, 225, 20)

			doc.fontSize(12)
				.moveDown()
				.text('A document\'s sha-512 hash has just been inserted in the FLO blockchain. This means that a file with a specific format and content that yields to this specific hash existed at least prior to the date of the transaction. This is a proof-of-existance of such a file. Blockchains in cryptocurrencies are virtually impossible to be tampered with and this record will be available for verification virtually forever.')

			doc.save()

			doc.translate(50, 0)
				.image(path.resolve(__dirname, 'flotorizer1.png'), 0, 15, {scale: 0.3})	

			let qrtx = qr.svgObject('https://florincoin.info/tx/' + data)

			doc.translate(210, 500).scale(2)
				.path(qrtx.path)
				.fill('black', 'even-odd')
				.stroke()
				.restore()

			doc.translate(-200, 150)
				.text('The document\'s hash is: ')
				.fontSize(8)
				.text(hashString, {width: 550})
				.moveDown()
				.fontSize(12)
				.text('It is stored in the transaction:')
				.fontSize(10)
				.text(data, {width: 600})

			doc.scale(1)
				.moveDown()
				.fontSize(12)
				.text('Please allow for a few minutes for the transaction to be processed. After that you can find it at:', {width: 550})
				.fontSize(10)
				.text('https://florincoin.info/tx/' + data, {width: 600})
				.moveDown()
				.text('Or scan the QR-code bellow.')

			doc.pipe(tempOutput)
			doc.end()
			tempOutput.on('finish', () => {
				console.log('end')
				res(pdfFilename)
			})
		})
			.catch((err) => {
				console.log('Something went wrong')
				console.log(err)
				rej(err)
			})
	})
}
