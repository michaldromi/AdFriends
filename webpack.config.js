var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./src/index.jsx' // Your appʼs entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['src', 'src/js', 'web_modules', 'bower_components', 'node_modules']
	},
	module: {

		loaders: loaders.concat([{
			test: /\.scss$/,
			loaders: [
				'style?sourceMap',
				'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
				'resolve-url',
				'sass?sourceMap'
			]
		},
			{
				test: /\.(eot|svg|ttf|woff)$/,
				loader: 'file?name=src/fonts/[name].[ext]'
			},
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file',
                include: './src/images'
            }
		])
	},
	devServer: {
		contentBase: "./public",
		noInfo: true, //  --no-info option
		hot: true,
		inline: true
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new CopyWebpackPlugin([{
			from: './src/index.html'
		}])
	]
};
