'use strict'

require('./SimpleWalletFlorincoin.js')


let wallet = new Wallet('5b2241e-73b9369e-32279b7-97f3210', 'z2fug*0Zb$4Y')

wallet.refreshBalances

wallet.load(function() {
	console.log('Wallet loaded')
	wallet.sendCoins('FJwbKCwBkkGrHKdmwHtsLrnu7b7MiVhfgM', 'FBqdwYLZnAoePCXqZExyR6wj9d1UZ5v4Xp', 0.5, "Testing simplewallet server side", function(err, data) {
		if (err)
			return console.error('failed to send transaction')
		return console.log('successfully send transaction. TXID: ', data)
	})
})



/*
FBqdwYLZnAoePCXqZExyR6wj9d1UZ5v4Xp: 0.915066
FJwbKCwBkkGrHKdmwHtsLrnu7b7MiVhfgM: 1.07546199*/