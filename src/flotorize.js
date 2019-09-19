'use strict'

const PDFDocument = require('pdfkit')
const path = require('path')
const fs = require('fs')
const jsonPackage = require('../package.json')
const pdf = require('html-pdf')

const defaultValue = 0.001

exports.flotorize = function(filename, hashString, coin, req) {
	return new Promise(function(res, rej) {
		let msg = 'This document has been flotorized: ' + hashString
		const address = coin.getMainAddress().getPublicAddress()
		console.log(`FLO address is: ${address}`)
		const to = {}
		to[address] = defaultValue
		coin.sendPayment({ to, floData:msg, coin:'flo' }).then((txid) => {
			console.log('It worked')
			let pdfFilename = 'Flotorizer.' + filename
			if (pdfFilename.match('.pdf$') === null) pdfFilename += '.pdf'
			let pdfPath = path.resolve(__dirname, '../scratch', pdfFilename)

      fs.readFile('./src/pdf-certificate.html', function (err, html) {
        console.log('The certificate template could not be found')
    	  if (err) return console.log(err)

  			html = html.toString()
  			html = html.replace(/{{datetime}}/g, new Date().toISOString().replace(/T/, ' at ').replace(/\..+/, '') + ' (UTC)')
  			html = html.replace(/{{hash}}/g, hashString)
  			html = html.replace(/{{txid}}/g, txid)
        html = html.replace(/{{protocol}}/g, req.protocol)
        html = html.replace(/{{host}}/g, req.headers.host)
        html = html.replace(/{{url1}}/g, 'https://livenet.flocha.in/tx/' + txid)
  			html = html.replace(/{{url2}}/g, 'https://florincoin.info/tx/' + txid)
        html = html.replace(/{{encoded_url1}}/g, encodeURI('https://livenet.flocha.in/tx/' + txid))
        html = html.replace(/{{encoded_url2}}/g, encodeURI('https://florincoin.info/tx/' + txid))

        pdf.create(html, {format:'Letter'}).toFile(pdfPath, function(err, rsp) {
          if (err) return console.log(err)
          console.log('PDF created')
          res(pdfFilename)
        })
    	})
		}).catch((err) => {
			console.log('Something went wrong')
			console.log(err)
			rej(err)
		})
	})
}
