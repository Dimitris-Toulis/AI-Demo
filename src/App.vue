<template>
	<h1 v-if="page.name != 'index'" class="m-4 text-center prose-xl md:prose-2xl">
		{{ Texts[Demos[page.path]?.name] }} ({{ Demos[page.path]?.name }})
	</h1>
	<div v-if="page.name != 'index'" class="border flex h-full border-blue-600 border-5 flex-1 m-4 mt-0 p-4">
		<Suspense>
			<template #default>
				<router-view />
			</template>
			<template #fallback>
				<ProgressSpinner animationDuration="infinite" class="m-auto" />
			</template>
		</Suspense>
	</div>
	<router-view v-else></router-view>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured } from "vue";
import Texts from "./texts.json";
import Demos from "./demos.json";
import ProgressSpinner from "primevue/progressspinner";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

export default defineComponent({
	name: "App",
	components: {
		ProgressSpinner,
	},
	setup: function () {
		onErrorCaptured(function (err) {
			alert("Failed initializing!");
		});
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
