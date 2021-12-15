import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/CanvasRenderEngineVS.ts",
	output: {
		dir: "public",
		format: 'iife',
		sourcemap: "true",
		name: "REVS"
	},
	plugins: [
		typescript()
	]
};