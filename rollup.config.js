import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default [
	{
		input: "src/index.ts",
		onwarn(warning, rollupWarn) {
			if (warning.code !== "CIRCULAR_DEPENDENCY") {
				rollupWarn(warning);
			}
		},
	  output: [
			{
				file: "./dist/esm/index.js",
				format: "es",
				esModule: true
			},
			{
				file: "./dist/cjs/index.js",
				format: "cjs",
				esModule: false
			},
			{
				file: "./dist/iife/spline.js",
				format: "iife",
				name: "spline"
			},
			{
				file: "./docs/lib/spline.js",
				format: "iife",
				name: "spline"
			}
	  ],
	  plugins: [
			resolve(),
			commonjs(),
			typescript()	
		]
	}
];