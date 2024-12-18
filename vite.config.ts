import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import WindiCSS from "vite-plugin-windicss";
import { minifyHtml } from "vite-plugin-html";
import fs from "fs";
import { injectManifest } from "rollup-plugin-workbox";

const headers: { key: string; value: string }[] = JSON.parse(
	fs.readFileSync("vercel.json", "utf-8")
).headers[0].headers;

export default defineConfig({
	plugins: [
		Vue(),
		Pages({
			importMode: "async",
			extensions: ["vue"],
			syncIndex: false,
		}),
		WindiCSS(),
		{
			name: "vite-headers",
			configureServer(server) {
				server.middlewares.use((_, res, next) => {
					headers.forEach((header) =>
						res.setHeader(
							header.key,
							header.key == "Content-Security-Policy"
								? header.value + " 'unsafe-inline'"
								: header.value
						)
					);
					_.url;
					next();
				});
			},
		},
		{
			name: "generate-webmanifest",
			apply: "build",
			enforce: "post",
			async generateBundle(_, bundle) {
				const imageRegex = /^assets\/(maskable_)?(192|512|screenshot_light|screenshot_dark)\.(\w|\d)+\.(png|webp|avif)/;
				const assets = Object.keys(bundle)
					.filter((v) => imageRegex.test(v))
					.map((v) => {
						return [v.replace(imageRegex, "$1$2.$4"), v];
					})
					.reduce((acc, val) => {
						return { ...acc, [val[0]]: "/" + val[1] };
					}, []);
				this.emitFile({
					type: "asset",
					fileName: "app.webmanifest",
					source: JSON.stringify({
						name: "AI Demo",
						short_name: "AI Demo",
						display: "standalone",
						description:
							"A website to try different Tensorflow.js AI models (made by Dimitris Toulis)",
						theme_color: "#2eeef0",
						background_color: "#1f2937",
						start_url: "/",
						icons: [
							{
								src: assets["192.png"],
								type: "image/png",
								sizes: "192x192",
							},
							{
								src: assets["192.webp"],
								type: "image/webp",
								sizes: "192x192",
							},
							{
								src: assets["192.avif"],
								type: "image/avif",
								sizes: "192x192",
							},
							{
								src: assets["512.png"],
								type: "image/png",
								sizes: "512x512",
							},
							{
								src: assets["512.webp"],
								type: "image/webp",
								sizes: "512x512",
							},
							{
								src: assets["512.avif"],
								type: "image/avif",
								sizes: "512x512",
							},
							{
								src: assets["maskable_192.png"],
								sizes: "192x192",
								type: "image/png",
								purpose: "maskable",
							},
						],
						screenshots: [
							{
								src: assets["screenshot_light.webp"],
								sizes: "1190x938",
								type: "image/webp",
							},
							{
								src: assets["screenshot_dark.webp"],
								sizes: "1190x938",
								type: "image/webp",
							},
						],
					}),
				});
				if (bundle["index.html"].type == "asset") {
					bundle["index.html"].source = (bundle["index.html"].source as string)
						.replace("/assets/192.png", assets["192.png"])
						.replace("</head>", "<link rel=manifest href=/app.webmanifest></head>");
				} else {
					this.warn("index.html not an asset!");
				}
			},
		},
		minifyHtml(),
	],
	json: {
		stringify: true,
	},
	optimizeDeps: {
		include: ["@tensorflow-models/qna", "@tensorflow-models/posenet", "@tensorflow/tfjs-core"],
	},
	build: {
		polyfillDynamicImport: false,
		rollupOptions: {
			plugins: [
				(injectManifest({
					mode: "production",
					swSrc: "src/sw.js",
					swDest: "dist/sw.js",
					globDirectory: "dist/",
					dontCacheBustURLsMatching: /assets\/.*/,
					globPatterns: ["assets/**/*.{js,css}", "index.html"],
				}) as unknown) as Plugin,
			],
			output: {
				manualChunks: (id) => {
					if (id.includes("@tensorflow/tfjs-layers")) return "vendor/tfjs-layers";
					if (id.includes("@tensorflow/tfjs-data")) return "vendor/tfjs-data";
					if (id.includes("@tensorflow/")) return "AI";
					if (id.includes("vue") && !id.includes(".vue")) return "vendor/vue";
					if (id.includes("util/AI")) return "AI";
				},
			},
		},
		terserOptions: {
			format: {
				comments: false,
			},
			compress: {
				typeofs: false,
				unsafe: true,
				passes: 3,
			},
		},
	},
	resolve: {
		alias: {
			"~": "./",
		},
	},
	define: {
		__VUE_OPTIONS_API__: false,
	},
});
