<template>
	<CommonCamera :draw="draw" :ai="ai" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonCamera from "../components/CommonCamera.vue";
import CommonAI from "../util/AI";
import { load, DetectedObject } from "@tensorflow-models/coco-ssd";

export default defineComponent({
	name: "ObjectDetector",
	components: {
		CommonCamera,
	},
	setup: async function () {
		const model = await CommonAI(load);
		const draw = async (objects: DetectedObject[], ctx: CanvasRenderingContext2D) => {
			ctx.lineWidth = 5;
			ctx.strokeStyle = `rgb(255,0,0)`;
			objects.forEach((object) => {
				ctx.lineWidth = 5;
				const [x, y, width, height] = object.bbox;
				ctx.strokeRect(x, y, width, height);
				ctx.lineWidth = 0.5;
				ctx.strokeText(`${object.class} ${(object.score * 100).toFixed(2)}%`, x, y - 10);
			});
		};
		const ai = (video: HTMLVideoElement) => {
			return model.detect(video);
		};
		return {
			ai,
			draw,
		};
	},
});
</script>
