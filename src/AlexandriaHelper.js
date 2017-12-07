'use strict'

const http = require('https')

let defaultHttpOptions = {
	method: 'POST',
	hostname: 'api.alexandria.io',
	headers: {},
	agent: false,
	'Content-Type': 'application/json'
}

const startingPage = 0

module.exports =
class AlexandriaHelper {
	constructor(httpOptions) {
		this.httpOptions = httpOptions ? httpOptions : defaultHttpOptions
	}

	isInBlockChain(hash) {
		return this.getTransactionsPerPage_(hash, startingPage).then((tr) => {
			console.log(tr)
			console.log(tr.length)
			const result = {
				exists: false,
				addr: ''
			}
			if (tr.length !== 0) {
				result.exists = true
				result.addr = tr[0].Hash
			}
			return result
		})
	}

	getTotalFlotorizations() {
		return new Promise((resolve, reject) => {
			const tx = 'This document has been flotorized'
			const trList = []

			const getInfo = (t, p) => {
				return this.getTransactionsPerPage_(t, p).then((newTr) => {
					if (newTr.length !== 0) {
						newTr.forEach((tr) => {
							trList.push(tr)
						})
						return getInfo(t, p + 1)
					}
				})
			}

			getInfo(tx, startingPage).then(() => {
				resolve(trList.length)
			})
		})
	}

	getTransactionsPerPage_(tx, page = startingPage) {
		this.httpOptions.path = '/alexandria/v2/searchTxComment'
		const content = {
			search: tx,
			page,
			'results-per-page': 30
		}
		const trList = []
		let data = ''
		return new Promise((resolve, reject) => {
			const req = http.request(this.httpOptions, (res) => {
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
						const info = JSON.parse(data)
						info.forEach((item) => {
							trList.push(item)
						})
						resolve(trList)
					}
					else {
						resolve([])
					}
					// console.log(items)
				})
			})
			req.write(JSON.stringify(content))
			req.end()
		})
		http.request()
	}
}
