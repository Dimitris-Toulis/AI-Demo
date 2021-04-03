import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import "windi.css";

createApp(App)
	.use(
		createRouter({
			history: createWebHistory(),
			routes,
		})
	)
	.mount("#app");
