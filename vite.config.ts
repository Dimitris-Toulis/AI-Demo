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
							header.value +
								(header.key == "Content-Security-Policy"
									? "style-src 'unsafe-inline';"
									: "")
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
		include: ["@tensorflow-models/qna"],
	},
	build:{
		polyfillDynamicImport: false		
	}
});
