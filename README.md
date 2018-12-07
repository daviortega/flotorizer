# Flotorizer

Flotorizer is a website that uses the ability to include text into the blockchain of FLO. Upon selection of the file, the software on the client side calculates a sha-512 hash of the document and sends it to the server. The server does not have any knowledge about the file, for privacy reasons. The server then executes a transaction between two Florincoins addresses and submits the hash of the document as the message in the transaction. When everything is successful, it sends a pdf with the information about the transaction where the hash can be found.

If you use Flotorizer, it is your responsibility to keep an exact copy of the original file submitted to Flotorizer and a copy of the pdf with information of the transaction. We delete the file instantaneously after download.

# How to run your own instance of the Flotorizer

Download and install the source code:
```
git clone https://gitlab.com/flotorizer/flotorizer.git
cd flotorizer
npm install
```

Now, you need to make and configure a file `.env` with the following information like this:

```bash
OIPWALLET_MNEMONIC = mnemonic_generated
OIPWALLET_ADDRESS  = address_generated
```
The mnemonic generation process is mentioned in
https://github.com/oipwg/oip-hdmw#creating-your-first-wallet

Address in https://github.com/oipwg/oip-hdmw/#getting-your-first-address

<br/>

Build the front-end:
```
npm run build
```

and start serving locally at the port 3000:
```
npm start
```
