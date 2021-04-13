import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import "windi.css";

import "./assets/192.avif";
import "./assets/192.png";
import "./assets/192.webp";
import "./assets/512.avif";
import "./assets/512.png";
import "./assets/512.webp";
import "./assets/maskable_192.png";

createApp(App)
	.use(
		createRouter({
			history: createWebHistory(),
			routes,
		})
	)
	.mount("#app");
