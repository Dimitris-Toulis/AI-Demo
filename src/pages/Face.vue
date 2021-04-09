<template>
	<CommonCamera :draw="draw" :ai="ai" :startup="startup" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommonCamera from "../components/CommonCamera.vue";
import CommonAI from "../util/AI";
import {
	Coord2D,
	Coords3D,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";
import { load, FaceLandmarksDetector } from "@tensorflow-models/face-landmarks-detection";

interface AnnotatedPredictionValues {
	kind: "MediaPipePredictionValues";
	faceInViewConfidence: number;
	boundingBox: {
		topLeft: Coord2D;
		bottomRight: Coord2D;
	};
	mesh: Coords3D;
	scaledMesh: Coords3D;
	annotations?: { [key: string]: Coords3D };
}

export default defineComponent({
	name: "Face",
	components: {
		CommonCamera,
	},
	setup: async function () {
		const draw = async (faces: AnnotatedPredictionValues[], ctx: CanvasRenderingContext2D) => {
			ctx.lineWidth = 5;
			ctx.fillStyle = `rgb(50,200,255)`;
			ctx.strokeStyle = `rgb(200,80,55)`;
			faces.forEach((face) => {
				if (face.faceInViewConfidence <= 0.5) return;
				const { topLeft, bottomRight } = face.boundingBox;
				ctx.strokeRect(
					topLeft[0],
					topLeft[1] - 7,
					bottomRight[0] - topLeft[0],
					bottomRight[1] - topLeft[1]
				);
				face.scaledMesh.forEach((point) => {
					ctx.beginPath();
					ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI);
					ctx.fill();
				});
			});
		};
		const startup = CommonAI(load);
		const ai = (model: FaceLandmarksDetector, video: HTMLVideoElement) => {
			return model.estimateFaces({
				input: video,
			});
		};
		return {
			startup,
			ai,
			draw,
		};
	},
});
</script>
