<template>
	<main class="flex h-full flex-1 place-items-center justify-center">
		<ul>
			<li
				v-for="(demo, path) in Demos"
				v-show="demo.status != -1"
				class="m-4 prose-xl select-none md:prose-2xl"
			>
				<router-link class="dark:text-gray-200" v-if="demo.status == 1" :to="path"
					>{{ Texts[demo.name] }} ({{ demo.name }})</router-link
				>
				<p
					v-else
					class="opacity-60 dark:opacity-50 dark:text-gray-200"
					aria-disabled="true"
				>
					{{ Texts[demo.name] }} ({{ demo.name }})
				</p>
			</li>
		</ul>
	</main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Texts from "../texts.json";
import Demos from "../demos.json";

export default defineComponent({
	name: "Home",
	data: function () {
		return {
			Texts: Texts.Home,
			Demos,
		} as {
			Texts: {
				[key: string]: string;
			};
			Demos: {
				[key: string]: {
					name: string;
					status: number;
				};
			};
		};
	},
});
</script>
