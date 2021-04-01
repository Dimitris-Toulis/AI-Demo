<template>
	<CommonImage :draw="draw" :WorkerConstructor="WorkerConstructor" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AIWorker from "./worker?worker";
import CommonImage from "../../../components/CommonImage.vue";

type Keypoint = {
	score: number;
	position: {
		x: number;
		y: number;
	};
	part: string;
};
export default defineComponent({
	name: "PoseNet",
	components: {
		CommonImage,
	},
	setup: async function () {
		const draw = async (keypoints: Keypoint[][], ctx: CanvasRenderingContext2D) => {
			ctx.lineWidth = 5;
			ctx.strokeStyle = `rgba(255,0,0)`;
			ctx.beginPath();
			keypoints.forEach((keypoint) => {
				ctx.globalAlpha = parseFloat(
					((keypoint[0].score + keypoint[1].score) / 2).toFixed(4)
				);
				ctx.moveTo(Math.floor(keypoint[0].position.x), Math.floor(keypoint[0].position.y));
				ctx.lineTo(Math.floor(keypoint[1].position.x), Math.floor(keypoint[1].position.y));
			});
			ctx.stroke();
		};
		return {
			draw,
			WorkerConstructor: AIWorker,
		};
	},
});
</script>
