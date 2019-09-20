/* eslint-env browser */
'use strict'

const jsonPackage = require('../package.json')

const CryptoJS = require('crypto-js')

let kDefaults = {
	hashAlgorithm: 'sha512',
	hashEncoding: 'hex'
}

require('../node_modules/bootstrap/dist/js/bootstrap.min.js')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./ga.js')
require('./style.css')

let title = document.createElement('h1')
title.classList.add('title')
title.innerHTML = `Flotorizer`
document.body.appendChild(title)

let logoDiv = document.createElement('div')
let logo = document.createElement('img')
logo.classList.add('logo')
logo.setAttribute('src', 'flotorizer.jpg')
logoDiv.appendChild(logo)
document.body.appendChild(logoDiv)

let flotorized = document.createElement('div')
flotorized.innerHTML = 'Total files flotorized: ...'
document.body.appendChild(flotorized)

let fileFormLabel = document.createElement('label')
fileFormLabel.classList.add('btn', 'btn-primary')
fileFormLabel.id = 'fileFormLabel'
fileFormLabel.setAttribute('for', 'fileInput')

let fileForm = document.createElement('input')
fileForm.id = 'fileInput'
fileForm.type = 'file'
fileForm.style.display = 'none'
fileForm.addEventListener('change', function() {
	let fileInput = document.getElementById('fileInput')
	let file = fileInput.files[0]
	console.log(file)
	let reader = new FileReader()

	reader.onloadend = function(event) {
		if (event.target.readyState === FileReader.DONE) {
			let wordArray = CryptoJS.lib.WordArray.create(event.target.result)
			let thisHash = CryptoJS.SHA512(wordArray).toString().toUpperCase()
			let getReq = 'f=' + file.name + '&' + 'hs=' + thisHash
			let url = '/flotorize?' + getReq
			element.setAttribute('href', url)
			element.click()
			hashString.innerHTML = 'Your file\'s hash:<br><br>' + thisHash
		}
	}
	reader.readAsArrayBuffer(file)
})

fileFormLabel.innerHTML = 'Choose a file'
fileFormLabel.appendChild(fileForm)
document.body.appendChild(fileFormLabel)

let hashString = document.createElement('p')
hashString.classList.add('hashed')
hashString.innerHTML = ''
document.body.appendChild(hashString)

let footer = document.createElement('div')
footer.classList.add('footer')
footer.innerHTML = '<a href="https://flo.cash/">Powered by the FLO blockchain</a><br>Consider donating FLO to FAcZMMWJddsj84EwT2gC36VxU2ifGwaZ7Z'
document.body.appendChild(footer)

let element = document.createElement('a')
element.style.display = 'none'
document.body.appendChild(element)

let xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4)
		flotorized.innerHTML = 'Total files flotorized: ' + xhr.response
}
xhr.open('GET', '/stats', true)
xhr.send()
