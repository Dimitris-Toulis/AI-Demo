<template>
	<h1
		v-if="(page.name || 'index') != 'index'"
		class="m-4 text-center prose-xl md:prose-2xl dark:text-gray-200"
	>
		{{ Texts[Demos[page.path]?.name] }} ({{ Demos[page.path]?.name }})
	</h1>
	<main
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
	</main>
	<router-view v-else></router-view>
	<transition name="fade">
		<div
			class="bg-gray-500 bg-green-600 h-30 m-5 text-center text-white p-3 right-0 bottom-0 shadow-2xl w-70 absolute dark:text-gray-200"
			v-if="SWprompt"
		>
			<p class="prose-lg">Reload to update</p>
			<div class="flex flex-row mt-2 justify-around">
				<button
					@click="skipSWwaiting()"
					class="rounded-lg bg-blue-600 p-2 pr-4 pl-4 prose-lg"
				>
					Reload
				</button>
				<button
					@click="closeSWprompt()"
					class="rounded-lg bg-blue-600 p-2 pr-4 pl-4 prose-lg"
				>
					Close
				</button>
			</div>
		</div></transition
	>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, onMounted, Ref, ref } from "vue";
import Texts from "./texts.json";
import Demos from "./demos.json";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { Workbox, messageSW } from "workbox-window";

const wb = new Workbox("/sw.js");

export default defineComponent({
	name: "App",
	setup: function () {
		let SWprompt = ref(false);
		const skipSWwaiting = async () => {
			wb.addEventListener("controlling", () => window.location.reload());
			messageSW(await wb.getSW(), { type: "SKIP_WAITING" });
		};
		const closeSWprompt = () => (SWprompt.value = false);
		onMounted(() => {
			if (import.meta.env.PROD) wb.register();
			wb.addEventListener("waiting", () => {
				SWprompt.value = true;
			});
		});
		return {
			Demos,
			Texts: Texts.Home,
			page: useRoute(),
			SWprompt,
			skipSWwaiting,
			closeSWprompt,
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
			SWprompt: Ref<boolean>;
			skipSWwaiting: () => void;
			closeSWprompt: () => void;
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

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
