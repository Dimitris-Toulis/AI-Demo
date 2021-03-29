<template>
	<CommonImage :ai="ai" :draw="draw" :startup="startup"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as posenet from "@tensorflow-models/posenet";
import CommonImage from "../../../components/CommonImage.vue";

export default defineComponent({
	name: "PoseNet",
	components: {
		CommonImage
	},
	setup: async function () {
		const ai = async(model: posenet.PoseNet, video : HTMLVideoElement) : Promise<posenet.Keypoint[][]> =>{
			let results = await model.estimateSinglePose(video);
			return posenet.getAdjacentKeyPoints(results.keypoints,0.5);
		}
		const draw = async(keypoints : posenet.Keypoint[][], ctx: CanvasRenderingContext2D) => {
			ctx.lineWidth = 5;
			ctx.strokeStyle = `rgba(255,0,0)`;
			keypoints.forEach((keypoint)=>{
				ctx.globalAlpha = parseFloat(((keypoint[0].score + keypoint[1].score)/2).toFixed(4));
				ctx.beginPath();
				ctx.moveTo(keypoint[0].position.x,keypoint[0].position.y);
				ctx.lineTo(keypoint[1].position.x,keypoint[1].position.y);
				ctx.stroke();
				ctx.closePath();
			});
		};
		const startup = async(video : HTMLVideoElement)=>{
			return await posenet.load();
		}
		return {
			ai,
			draw,
			startup
		};
	},
});
</script>
