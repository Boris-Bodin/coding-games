const webpack = require("webpack");
const path = require("path");

let config = {
	mode: 'development',
	entry: "./ts/main.js",
	output: {
		path: __dirname,
		filename: "./main.js"
	}
}

module.exports = config;