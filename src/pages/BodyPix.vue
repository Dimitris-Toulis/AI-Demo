<template>
	<CommonCamera :draw="draw" :ai="ai" :startup="startup" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonCamera from "../components/CommonCamera.vue";
import CommonAI from "../util/AI";
import * as bodypix from "@tensorflow-models/body-pix";

export default defineComponent({
	name: "BodyPix",
	components: {
		CommonCamera,
	},
	setup: async function () {
		let _video: HTMLVideoElement;
		const draw = async (
			personSegmentation: bodypix.SemanticPersonSegmentation,
			ctx: CanvasRenderingContext2D
		) => {
			ctx.lineWidth = 5;
			ctx.fillStyle = `rgb(50,200,255)`;
			ctx.strokeStyle = `rgb(200,80,55)`;
			const mask = bodypix.toMask(personSegmentation);
			bodypix.drawMask(ctx.canvas, _video, mask, 0.9);
		};
		const startup = CommonAI(bodypix.load);
		const ai = (model: bodypix.BodyPix, video: HTMLVideoElement) => {
			_video = video;
			return model.segmentPerson(video);
		};
		return {
			startup,
			ai,
			draw,
		};
	},
});
</script>
