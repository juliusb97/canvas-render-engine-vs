import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
//import pluginTs from "rollup-plugin-ts";
// import typescript from "rollup-plugin-typescript2";
import typescript from "@rollup/plugin-typescript";
//import pluginDts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";
import * as path from "path";
import pkg from "./package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");
const inputFileName = "./src/CanvasRenderEngineVS.ts";
const author = pkg.author;
const banner = `
	/**
	* @license MIT
	* author: ${author}
	* ${moduleName}.js v${pkg.version}
	* Released under the ${pkg.license} license.
	*/
`;

export default [
	{
		input: inputFileName,
		output: {
			file: pkg.browser,
			format: 'iife',
			sourcemap: "inline",
			banner,
			name: "REVS"
		},
		plugins: [
			// typescript({
			// 	tsconfig: "tsconfig.json",
			// 	browserslist: "false"
			// }),
			typescript({tsconfig: "./tsconfig.json"}),
			pluginCommonjs({
				extensions: [".js", ".ts"]
			}),
			pluginNodeResolve({
				browser: true
			})
		]
	},
	{
		input: inputFileName,
		output: [{
			file: pkg.module,
			format: "es",
			sourcemap: "inline",
			banner,
			exports: "named"
		}],
		external: [
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.devDependencies || {})
		],
		plugins: [
			typescript({
				tsconfig: "./tsconfig.json",
			}),
			pluginCommonjs({
				extensions: [".js", ".ts"]
			}),
			babel({
				babelHelpers: "bundled",
				configFile: path.resolve(__dirname, ".babelrc.js")
			}),
			pluginNodeResolve({
				browser: false
			})
		]
	},
	// {
	// 	input: inputFileName,
	// 	output: [{
	// 		file: pkg.main,
	// 		format: "cjs",
	// 		sourcemap: "inline",
	// 		banner,
	// 		exports: "default"
	// 	}],
	// 	external: [
	// 		...Object.keys(pkg.dependencies || {}),
	// 		...Object.keys(pkg.devDependencies || {})
	// 	],
	// 	plugins: [
	// 		// pluginTs({
	// 		// 	tsconfig: "tsconfig.json",
	// 		// 	browserslist: false
	// 		// }),
	// 		typescript({
	// 			declaration: true,
	// 			tsconfig: "tsconfig.json",
	// 			browserslist: "false"
	// 		}),
	// 		pluginCommonjs({
	// 			extensions: [".js", ".ts"]
	// 		}),
	// 		babel({
	// 			babelHelpers: "bundled",
	// 			configFile: path.resolve(__dirname, ".babelrc.js")
	// 		}),
	// 		pluginNodeResolve({
	// 			browser: false
	// 		})
	// 	]
	// },
	// {
	// 	input: "./ts/CanvasRenderEngineVS.d.ts",
	// 	output: [{
	// 		file: "dist/CanvasRenderEngineVS.d.ts",
	// 		format: "es"
	// 	}],
	// 	plugins: [pluginDts()]
	// }
];