
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const postcss = require('postcss')


module.exports = {
	module: {
		rules: [
			{
				test: /\.txt$/, use: 'raw-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'postcss-loader'],
			},
			{
				test: /\.jsx?$/,
				use: ['babel-loader', 'astroturf/loader'],
			}],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		require('postcss-focus'),
		require('autoprefixer')
	],
	env: {
		"BASE_URL": "https://above-the-sky.vercel.app/",
		"MONGO_URL": "mongodb+srv://dobresco:above42@ats0.lac1i.mongodb.net/abovethesky_database?retryWrites=true&w=majority",
		"ACCESS_TOKEN_SECRET": "above12332377947551327083",
		"REFRESH_TOKEN_SECRET": "above123secret66018398rere45292697",
		"PAYPAL_CLIENT_ID": "AatfPsyuY1AaZR2b1vzmjFSt8pdAvkOOx_NmRXegmfUdxAaAaMkyzcPhZXeODrQDSHs9SoTqGs_nXKD1",
		"CLOUD_UPDATE_PRESET": "above_the_sky_upload",
		"CLOUD_NAME": "navem",
		"CLOUD_API": "https://api.cloudinary.com/v1_1/navem/image/upload"
	},
	reactStrictMode: false,
	webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = {
			fs: false,
			child_process: false,
			crypto: false
		};

		return config;
	}
}


module.exports.postcss = true