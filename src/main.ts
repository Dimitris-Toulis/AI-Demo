import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from 'virtual:generated-pages';
import "windi.css";
import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import Button from "primevue/button";

createApp(App)
.use(createRouter({
	history: createWebHistory(),
	routes
}))
.use(PrimeVue, {ripple: true})
.component("Button",Button)
.mount("#app");