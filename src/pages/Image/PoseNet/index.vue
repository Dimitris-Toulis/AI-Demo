<template>
	<CommonCamera :draw="draw" :ai="ai" :startup="startup" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonCamera from "../../../components/CommonCamera.vue";
import CommonAI from "../../../util/AI";
import { load, Keypoint, PoseNet, getAdjacentKeyPoints } from "@tensorflow-models/posenet";

export default defineComponent({
	name: "PoseNet",
	components: {
		CommonCamera,
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
		const startup = CommonAI(load);
		const ai = async (model: PoseNet, video: HTMLVideoElement) => {
			return getAdjacentKeyPoints((await model.estimateSinglePose(video)).keypoints, 0.5);
		};
		return {
			startup,
			ai,
			draw,
		};
	},
});
</script>
