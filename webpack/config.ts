import "../typings/Console"

import path from "path"
import webpack from "webpack"
import VersionManager from "@theadmasters/version-manager"

import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import TerserJSPlugin from "terser-webpack-plugin"
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"
import UglifyJSPlugin from "uglifyjs-webpack-plugin"

const { CONFIG, MODE } = process.env

console.log("\n\n")
console.say("Welcome to the *awesome typescript webpack* config! :)")
switch (CONFIG) {
	case "development":
		console.nfo("Running *development server*...*")
		break
	case "production":
		console.nfo(`Building new *${MODE} version*...`)
		break
	default:
		console.no(`Wrong *CONFIG* env variable value. Expected values: *development, production*, got *${CONFIG || "nothing"}*`)
		process.exit(1)
}
console.log("\n\n")

const versionManager = new VersionManager(undefined, MODE)
if (CONFIG == "production")
	versionManager.increaseVersion()

const sassLoader: webpack.Loader = {
	loader: "sass-loader",
	options: {
		sassOptions: {
			includePaths: [
				path.resolve(__dirname, "../src")
			]
		}
	}
}

const defaultRules: webpack.Rule[] = [
	{
		test: /\.tsx?$/,
		loader: "ts-loader",
		exclude: /node_modules/,
	},
	{
		enforce: "pre",
		test: /\.js$/,
		loader: "source-map-loader"
	},
	{
		test: /\.html$/,
		loader: "html-loader"
	}
]

const defaultConfig: webpack.Configuration = {
	resolve: {
		modules: [
			"node_modules",
			path.resolve(__dirname, "../src"),
		],
		extensions: [".js", ".jsx", ".sass", ".json", ".css", ".ts", ".tsx"]
	},
	performance: {
		hints: "warning",
		maxAssetSize: 20000000000,
		maxEntrypointSize: 40000000000
	},
	parallelism: 12,
}

const devConfig: webpack.Configuration = {
	...defaultConfig,
	mode: "development",
	entry: {
		app: path.resolve(__dirname, "../src/index.tsx")
	},
	output: {
		path: __dirname,
		filename: "dist/bundle.js",
		publicPath: "/"
	},
	devtool: "eval-source-map",
	devServer: {
		hot: true,
		historyApiFallback: {
			index: "/webpack/templates/index.dev.html"
		},
		host: "localhost",
		port: 1239,
		watchOptions: {
			poll: true,
		},
		disableHostCheck: true
	},
	module: {
		rules: [
			...defaultRules,
			{
				test: /\.(sa|c)ss$/,
				use: [
					"style-loader",
					"css-loader",
					sassLoader
				]
			}
		]
	}
}

const prodConfig: webpack.Configuration = {
	...defaultConfig,
	mode: "production",
	entry: {
		app: path.resolve(__dirname, "../src/index.tsx")
	},
	output: {
		path: path.resolve(__dirname, `../dist/${versionManager.version}`),
		filename: `bundle.js`,
		publicPath: `/assets/${versionManager.version}`
	},
	module: {
		rules: [
			...defaultRules,
			{
				test: /\.(sa|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					sassLoader
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserJSPlugin({}), 
			new OptimizeCSSAssetsPlugin({})
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.HOST": "window.location.origin",
			"process.env.VERSION": JSON.stringify(versionManager.version),
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new UglifyJSPlugin({
			exclude: [/\.(min|worker)\.js$/gi],
			uglifyOptions: {
				ie8: false,
				mangle: true,
				output: {
					comments: false,
					beautify: false
				}
			}
		}),
		new HtmlWebpackPlugin({
			template: "webpack/templates/index.ejs",
			filename: "index.html",
			_version: `<script>window.__APP_VERSION__ = "${versionManager.version}"</script>`,
			_title: "${__rh-title}",
			_meta: "${__rh-meta}",
			_link: "${__rh-link}",
			_htmlAttributes: "${__rh-htmlAttributes}",
			_bodyAttributes: "${__rh-bodyAttributes}",
			_body: "${__body}"
		}),
		new MiniCssExtractPlugin({
			filename: `style.css`
		}),
	]
}

const envConfigs = {
	development: devConfig,
	production: prodConfig
}

export default envConfigs[CONFIG]