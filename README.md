# Flotorizer

Flotorizer is a website that uses the hability to include text into the blockchain of Florincoins. Upon selection of the file, the software on the client side calculates a sha-512 hash of the document and sends it to the server. The server does not have any knowledge about the file, for pirvacy reasons. The server then executes a transaction between two Florincoins addresses and submits the hash of the document as the message in the transaction. If everything is sucessful, it sends a pdf with the information about the transaction where the hash can be found.

If you use Flotorizer, it is your responsibitity to keep an exact copy of the original file submited to Flotorizer and a copy of the pdf with information of the transaction. We delete the file instantaneusly after download.

# How to run your own instance of the Flotorizer

Download and install the source code:
```
git clone https://github.com/daviortega/flotorizer.git
cd flotorizer
npm install
```

Now, you need to make and configure a file `.env` with the following information like this:

```bash
"username" FLOWALLET_USERNAME=your_user_name
"password" FLOWALLET_PASSWORD=your_password
"address1" FLOWALLET_ADDRESS1=one_flo_address
"address2" FLOWALLET_ADDRESS2=two_flo_address
```

Build the front-end:
```
npm run build
```

and start serving locally at the port 3000:
```
npm start
```
