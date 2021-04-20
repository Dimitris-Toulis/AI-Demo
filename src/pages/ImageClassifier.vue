<template>
	<div>
		<div v-for="result in results" class="flex flex-row justify-between">
			<p>{{ result.className }}</p>
			<p>{{ (result.probability * 100).toFixed(2) }}%</p>
		</div>
		<CommonCamera :draw="draw" :ai="ai" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import CommonCamera from "../components/CommonCamera.vue";
import CommonAI from "../util/AI";
import { load } from "@tensorflow-models/mobilenet";

export default defineComponent({
	name: "ImageClassifier",
	components: {
		CommonCamera,
	},
	setup: async function () {
		const model = await CommonAI(load);
		let results: Ref<
			{
				className: string;
				probability: number;
			}[]
		> = ref([]);
		const draw = async (
			predictions: {
				className: string;
				probability: number;
			}[],
			ctx: CanvasRenderingContext2D
		) => {
			results.value = predictions;
			console.log(predictions);
		};
		const ai = async (video: HTMLVideoElement) => {
			return model.classify(video);
		};
		return {
			ai,
			draw,
			results,
		};
	},
});
</script>
