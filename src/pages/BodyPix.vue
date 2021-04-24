<template>
	<CommonCamera :draw="draw" :ai="ai" :facing-mode="'user'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonCamera from "../components/CommonCamera.vue";
import CommonAI from "../util/AI";
import { load, SemanticPersonSegmentation, toMask, drawMask } from "@tensorflow-models/body-pix";

export default defineComponent({
	name: "BodyPix",
	components: {
		CommonCamera,
	},
	setup: async function () {
		let _video: HTMLVideoElement;
		const model = await CommonAI(load);
		const draw = async (
			personSegmentation: SemanticPersonSegmentation,
			ctx: CanvasRenderingContext2D
		) => {
			ctx.lineWidth = 5;
			ctx.fillStyle = `rgb(50,200,255)`;
			ctx.strokeStyle = `rgb(200,80,55)`;
			const mask = toMask(personSegmentation);
			drawMask(ctx.canvas, _video, mask, 0.9);
		};
		const ai = (video: HTMLVideoElement) => {
			_video = video;
			return model.segmentPerson(video);
		};
		return {
			ai,
			draw,
		};
	},
});
</script>
