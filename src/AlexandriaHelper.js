'use strict'

const http = require('https')

let defaultHttpOptions = {
	method: 'GET',
	hostname: 'api.oip.io'
}

module.exports =
class AlexandriaHelper {
	constructor(httpOptions) {
		this.httpOptions = httpOptions ? httpOptions : defaultHttpOptions
	}

	searchFLO(text) {
		console.log('Asking OIP')
		this.httpOptions.path = encodeURI(`/oip/floData/search?q=${text}`)
		return new Promise((resolve, reject) => {
			let data = ''
			const req = http.request(this.httpOptions, (res) => {
				//console.log(res.statusMessage)
				if (res.statusCode !== 200)
					reject(res)
				res.on('data', (buffer) => {
					if (buffer.toString() !== 'null')
						data += buffer.toString()
				})
				res.on('error', (err) => {
					console.log('error on request')
					reject(err)
				})
				res.on('end', () => {
					if (data !== '') {
						console.log(data)
						const info = JSON.parse(data)
						resolve(info)
					}
					else {
						resolve([])
					}
				})
			})
			req.end()
		})
	}

	isInBlockChain(hash) {
		console.log('Is in the blockchain?')
		return this.searchFLO(hash).then((results) => {
			console.log(results)
			const result = {
				exists: false,
				addr: ''
			}
			if (results.total !== 0) {
				result.exists = true
				result.addr = results.results[0].tx.txid
			}
			return result
		})
			.catch((err) => {
				console.log(err)
				throw err
			})
	}

	getTotalFlotorizations() {
		console.log('total of flotorizations')
		const msg = '"This document has been flotorized"'
		return this.searchFLO(msg).then((results) => {
			return results.total
		})
			.catch((err) => {
				console.log(err)
				throw err
			})
	}
}
