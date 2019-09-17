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
				.text('FLO Blockchain "Proof of Existance" Certificate')
				.moveDown()
				.fontSize(12)
				.text('Flotorizer created unique SHA-512 hash for this file on [WE SHOULD ADD DATE AND TIME HERE] based on the file\'s unique features including its format, content, and size. The SHA-512 hash has been permanently appended to the decentralized FLO Blockchain network and it is now cryptographically associated with the original file.')
		
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
				.text('The document\'s SHA-512 hash is:')
				.fontSize(8)
				.text(hashString, {width: 550})
				.moveDown()
				.fontSize(12)
				.text('It was stored and permentality appened to the FLO Blockchain via this FLO transaction:')
				.fontSize(10)
				.text(data, {width: 600})

			doc.scale(1)
				.moveDown()
				.fontSize(12)
				.text('Please allow for a few minutes for the transaction to be processed. After that you can find it at:', {width: 550})
				.fontSize(10)
				.text('https://florincoin.info/tx/' + data, {width: 600})
				.moveDown()
				.text('You can also find the transaction by scanning the QR-code below.')
			
				.moveDown()
			
				.text(`Flotorizer ${jsonPackage.version}`, 225, 20)

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
