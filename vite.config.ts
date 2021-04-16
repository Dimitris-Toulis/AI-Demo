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
				const imageRegex = /^assets\/(maskable_)?(192|512|icon2)\.(\w|\d)+\.(png|webp|avif)/;
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
						theme_color: "#b51414",
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
					}),
				});
				if (bundle["index.html"].type == "asset") {
					bundle["index.html"].source = (bundle["index.html"].source as string).replace(
						"/assets/192.png",
						assets["192.png"]
					);
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
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules/@vue")) return "vendor/vue";
					if (id.includes("node_modules/vue-router")) return "vendor/vue-router";
					if (id.includes("node_modules/@tensorflow-models/"))
						return `vendor/models/${
							id.split("node_modules/@tensorflow-models/")[1].split("/")[0]
						}`;
					if (id.includes("node_modules/@tensorflow")) return "vendor/tfjs";
					if (id.includes("node_modules/comlink")) return "vendor/comlink";
				},
			},
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
});
