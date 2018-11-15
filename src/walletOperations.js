'use strict'

const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

const networks = HDMW.Networks;
const address  = new HDMW.Address("FHvFYxkeHiy7dTLuEjzERHUheQvYM2gZ7h", networks.flo, false);

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
			
			console.log("My Wallets Bitcoin Main Address: ", 'FHvFYxkeHiy7dTLuEjzERHUheQvYM2gZ7h');

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

			var myWallet = new Wallet('found purchase heavy utility treat ripple army repeat century oxygen skill strategy', {
					supported_coins: ["flo"]
			})

			if (execute) {
				
					console.log('This would be trigger a transaction and recipient address will be same')
					// console.log('The total balance is: ' + this.balance)
					console.log('The message would be: ')
					console.log(msg)

					myWallet.sendPayment({
						to: { 'FHvFYxkeHiy7dTLuEjzERHUheQvYM2gZ7h' : 0.01 },
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
