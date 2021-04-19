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

const app = createApp(App);
app.use(
	createRouter({
		history: createWebHistory(),
		routes,
	})
);
app.config.errorHandler = (err) => {
	alert("Error! " + err);
	console.log(err);
};
app.mount("#app");
