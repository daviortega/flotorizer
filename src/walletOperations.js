'use strict'

const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

const networks = HDMW.Networks;
const address  = new HDMW.Address("ocCQzLAopzWGmYxQMKQ5xLZDV2e62nEC5G", networks.flo_testnet, false);

module.exports =
class MyWallet {
	constructor(address) {
		this.address = [
			{
				hash: address,
				val: 0
			}
		]
	}
	init() {
		this.wallet = new Promise((resolve, reject) => {
			
			console.log("My Wallets Bitcoin Main Address: ", 'ocCQzLAopzWGmYxQMKQ5xLZDV2e62nEC5G');

			address.updateState().then((addr) => {

				this.balance = addr.getBalance();
				console.log('Balance'+this.balance)
			})

			console.log('wallet ready')
			let initial = 1.99052799
			let previous = 0
			this.flotorizations = previous + Math.floor((initial - this.balance) * 1000)
			console.log(this.flotorizations)

		})
	}

	pushToBlockChain(msg, execute = true) {

		return new Promise((res, rej) => {

			var myWallet = new Wallet('vanish noise travel buzz neutral disagree powder spy hub tree link kid', {
					supported_coins: ["flo_testnet"]
			})

			if (execute) {
				
					console.log('This would be trigger a transaction and recipient address will be ocCQzLAopzWGmYxQMKQ5xLZDV2e62nEC5G')
					// console.log('The total balance is: ' + this.balance)
					console.log('The message would be: ')
					console.log(msg)

					myWallet.sendPayment({
						to: { 'ocCQzLAopzWGmYxQMKQ5xLZDV2e62nEC5G' : 0.1 },
						floData: msg
					}).then(function(txid){
						console.log("Successfully sent Transaction! " + txid);

						res(txid)

					}).catch(function(error){
						console.error("Unable to send Transaction!", error)
						rej('Failed to send transaction' + error)
					})
			}
			else {
				res('8004104227dc5f59c6e817dbcd4d192d21c31118b1e2225133d0d0022b9c61b6')
			}
		})
	}
}
