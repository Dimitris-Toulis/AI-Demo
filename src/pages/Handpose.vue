<template>
	<CommonCamera :draw="draw" :ai="ai" :facing-mode="'user'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonCamera from "../components/CommonCamera.vue";
import CommonAI from "../util/AI";
import { load, AnnotatedPrediction } from "@tensorflow-models/handpose";

export default defineComponent({
	name: "Handpose",
	components: {
		CommonCamera,
	},
	setup: async function () {
		const model = await CommonAI(load);

		const draw = async (hands: AnnotatedPrediction[], ctx: CanvasRenderingContext2D) => {
			ctx.lineWidth = 5;
			ctx.fillStyle = `rgba(255,0,0)`;
			console.log(hands);
			hands.forEach((hand) => {
				hand.landmarks.forEach((point) => {
					ctx.beginPath();
					ctx.arc(point[0], point[1], 2, 0, 2 * Math.PI);
					ctx.fill();
				});
			});
		};
		const ai = async (video: HTMLVideoElement) => {
			return model.estimateHands(video);
		};
		return {
			ai,
			draw,
		};
	},
});
</script>
