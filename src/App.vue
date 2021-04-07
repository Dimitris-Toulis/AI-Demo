<template>
	<h1 v-if="(page.name || 'index') != 'index'" class="m-4 text-center prose-xl md:prose-2xl">
		{{ Texts[Demos[page.path]?.name] }} ({{ Demos[page.path]?.name }})
	</h1>
	<div
		v-if="(page.name || 'index') != 'index'"
		class="border flex h-full border-blue-600 border-5 flex-1 m-4 mt-0 p-4"
	>
		<Suspense>
			<template #default>
				<router-view />
			</template>
			<template #fallback>
				<div class="spinner" />
			</template>
		</Suspense>
	</div>
	<router-view v-else></router-view>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, onMounted } from "vue";
import Texts from "./texts.json";
import Demos from "./demos.json";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { registerSW } from "virtual:pwa-register";

export default defineComponent({
	name: "App",
	setup: function () {
		onErrorCaptured(function (err) {
			alert("Failed initializing!");
		});
		onMounted(registerSW);
		return {
			Demos,
			Texts: Texts.Home,
			page: useRoute(),
		} as {
			Demos: {
				[key: string]: {
					name: string;
					status: number;
				};
			};
			Texts: {
				[key: string]: string;
			};
			page: RouteLocationNormalizedLoaded;
		};
	},
});
</script>

<style scoped>
.spinner {
	margin: auto;
	height: 20vmin;
	width: 20vmin;
	border: solid 1.5vmin;
	border-color: red gold forestgreen dodgerblue;
	border-radius: 9999px;
	animation: spin 1s infinite;
	filter: drop-shadow(1px 1px 4px gray);
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	30% {
		transform: rotate(-50deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
