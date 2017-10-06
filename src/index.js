/* eslint-env browser */
'use strict'

const CryptoJS = require('crypto-js')

let kDefaults = {
	hashAlgorithm: 'sha512',
	hashEncoding: 'hex'
}

require('../node_modules/bootstrap/dist/js/bootstrap.min.js')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./style.css')

let title = document.createElement('h1')
title.classList.add('title')
title.innerHTML = 'Flotorizer 1.0-beta'
document.body.appendChild(title)

let logoDiv = document.createElement('div')
let logo = document.createElement('img')
logo.classList.add('logo')
logo.setAttribute('src', 'flotorizer1.png')
logoDiv.appendChild(logo)
document.body.appendChild(logoDiv)


let fileFormLabel = document.createElement('label')
fileFormLabel.classList.add('btn', 'btn-primary')
fileFormLabel.id = 'fileFormLabel'
fileFormLabel.setAttribute('for', 'fileInput')

let fileForm = document.createElement('input')
fileForm.id = 'fileInput'
fileForm.type = 'file'
fileForm.style.display = 'none'
fileForm.addEventListener('change', function() {
	let fileInput = document.getElementById('fileInput'),
		newick = '',
		file = fileInput.files[0]
	console.log(file)
	let reader = new FileReader()

	reader.onloadend = function(event) {
		if (event.target.readyState === FileReader.DONE) {
			let wordArray = CryptoJS.lib.WordArray.create(event.target.result),
    			thisHash = CryptoJS.SHA512(wordArray).toString().toUpperCase(),
				xhr = new XMLHttpRequest(),
				getReq = 'f=' + file.name + '&' + 'hs=' + thisHash,
				url = 'http://localhost:3000/flotorize?' + getReq
			let element = document.createElement('a')
			element.setAttribute('href', url)
			element.style.display = 'none'
			document.body.appendChild(element)
			element.click()
			document.body.removeChild(element)
			let hashString = document.createElement('p')
			hashString.classList.add('hashed')
			hashString.innerHTML = thisHash
			document.body.appendChild(hashString)
		}
	}
	reader.readAsArrayBuffer(file)
})

fileFormLabel.innerHTML = 'Choose a file'
fileFormLabel.appendChild(fileForm)
document.body.appendChild(fileFormLabel)


