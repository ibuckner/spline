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
				file: "./dist/index.js",
				format: "esm",
				esModule: true
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