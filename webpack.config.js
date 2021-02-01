const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonRules = 
	[{
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
				  "@babel/preset-env",
				  "@babel/preset-react"
				],
				plugins: [
					"@babel/plugin-proposal-class-properties",
					"@babel/plugin-transform-modules-commonjs"
				]
			}
		}
	},
	{
		test: /\.module\.css$/,
		exclude: [/node_modules/],
		use: [
			MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: true
				}
			}
			
		]
	},
	{
		test: /\.css$/,
		exclude: [/node_modules/, /\.module\.css$/],
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader'
		]
	}
]

const commonPlugins = [
	new MiniCssExtractPlugin({
		filename: './public/[name].bundle.css'
	}),
]

const serverConfig = {
	entry: { 
		server: {
			import: './entry.js',
			filename: './server.bundle.js'
		}
	},
	devtool: "inline-source-map", 

	target: 'node',
	externals: [nodeExternals()],

	output: {
		path: __dirname,
		filename: '[name].bundle.js'
	},

	module: {
		rules: [...commonRules],
	},
	plugins: [...commonPlugins]
};

const clientConfig = {
	entry: { 
		grocery_client: {
			import: './grocery/client/client.js',
			filename: './grocery/public/client.bundle.js'
		},
		blog_client: {
			import: './blog/client/client.js',
			filename: './blog/public/client.bundle.js'
		}
	},
	devtool: "inline-source-map", 

	target: 'web',
	output: {
		path: __dirname,
	},

	module: {
		rules:  [...commonRules]
	},
	plugins: [...commonPlugins]
	  
};

module.exports = [serverConfig, clientConfig]