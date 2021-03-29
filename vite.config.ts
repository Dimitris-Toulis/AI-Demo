import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import WindiCSS from "vite-plugin-windicss";
import { minifyHtml } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";

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
		minifyHtml(),
		VitePWA({
			manifest: {
				name: "AI Demo",
				short_name: "AI Demo",
				display: "standalone",
				theme_color: "#b51414",
				icons: [
					{
						src: "/192.png",
						type: "image/png",
						sizes: "192x192",
					},
					{
						src: "/192.webp",
						type: "image/webp",
						sizes: "192x192",
					},
					{
						src: "/192.avif",
						type: "image/avif",
						sizes: "192x192",
					},
					{
						src: "/512.png",
						type: "image/png",
						sizes: "512x512",
					},
					{
						src: "/512.webp",
						type: "image/webp",
						sizes: "512x512",
					},
					{
						src: "/512.avif",
						type: "image/avif",
						sizes: "512x512",
					},
					{
						src: "/maskable_192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
		{
			name: "vite-headers",
			configureServer(server) {
				server.middlewares.use((_, res, next) => {
					headers.forEach((header) =>
						res.setHeader(
							header.key,
							header.key == "Content-Security-Policy"
								? "default-src 'none'; connect-src 'self' https://storage.googleapis.com https://tfhub.dev/tensorflow/tfjs-model/; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; object-src 'none'; prefetch-src 'self'; worker-src 'self'; frame-ancestors 'none'; form-action 'none'; block-all-mixed-content; base-uri 'none'; manifest-src 'self'"
								: header.value
						)
					);
					next();
				});
			},
		},
	],
	json: {
		stringify: true,
	},
	optimizeDeps: {
		include: ["@tensorflow-models/qna","@tensorflow-models/posenet"],
	},
	build: {
		polyfillDynamicImport: false,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules/@vue")) return "vendor/vue";
					if (id.includes("node_modules/vue-router")) return "vendor/vue-router";
					if (id.includes("node_modules/primevue")) return "vendor/primevue";
				},
			},
		},
	},
});
