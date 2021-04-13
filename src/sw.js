import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setDefaultHandler } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { imageCache } from "workbox-recipes";
import { BackgroundSyncPlugin } from "workbox-background-sync";

precacheAndRoute(self.__WB_MANIFEST);

imageCache();

registerRoute(
	({ request, url }) =>
		["style", "script", "worker"].includes(request.destination) && url.origin == self.origin,
	new CacheFirst({
		cacheName: "static-assets",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 40,
			}),
		],
	})
);

registerRoute(
	({ url }) => url.pathname.endsWith(".wasm") && url.origin == self.origin,
	new CacheFirst({
		cacheName: "wasm",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 2,
			}),
		],
	})
);

registerRoute(
	({ request }) => request.destination == "document",
	new StaleWhileRevalidate({
		cacheName: "pages",
		plugins: [
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60,
			}),
			new BackgroundSyncPlugin("document-queue", {
				maxRetentionTime: 24 * 60,
			}),
		],
	})
);

registerRoute(
	({ url }) => url.pathname.includes("tfjs-models"),
	new StaleWhileRevalidate({
		cacheName: "tfjs-models",
		plugins: [
			new BackgroundSyncPlugin("tfjs-model-queue", {
				maxRetentionTime: 24 * 60,
			}),
		],
	})
);

setDefaultHandler(new NetworkFirst());
