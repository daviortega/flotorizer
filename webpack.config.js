'use strict'

let path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	webpack = require('webpack')

module.exports = {
	entry: {
		//vasimpleDeps: './src/SimpleDeps.js',
		//simpleWallet: './src/SimpleWalletFlorincoin.js',
		app: './src/index.js',
		vendor: ['jquery']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.png$/,
				exclude: /node_modules/,
				loader: 'file-loader?name=images/[name].[ext]'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /node_modules\/(pdfkit|fontkit|png-js|linebreak|unicode-properties|brotli)\//,
				loader: "transform-loader?brfs"
			},
			{
				test: /node_modules\/unicode-properties.*\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'html-loader'
			}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Flotorizer',
			filename: __dirname + '/public/index.html'
		}),
		new webpack.ProvidePlugin({ // inject ES5 modules as global vars
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Tether: 'tether'
		})
	],
	devtool: 'inline-source-map'
}
