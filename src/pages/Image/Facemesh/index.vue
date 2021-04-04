<template>
	<CommonCamera :draw="draw" :WorkerConstructor="WorkerConstructor" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AIWorker from "./worker?worker";
import CommonCamera from "../../../components/CommonCamera.vue";
import {
	Coord2D,
	Coords3D,
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh/util";

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
	name: "Facemesh",
	components: {
		CommonCamera,
	},
	setup: async function () {
		const draw = async (faces: AnnotatedPredictionValues[], ctx: CanvasRenderingContext2D) => {
			ctx.lineWidth = 5;
			ctx.fillStyle = `rgb(50,200,255)`;
			faces.forEach((face) => {
				console.log(face);
				if (face.faceInViewConfidence <= 0.5) return;
				face.scaledMesh.forEach((point) => {
					ctx.beginPath();
					ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI);
					ctx.fill();
				});
			});
		};
		return {
			draw,
			WorkerConstructor: AIWorker,
		};
	},
});
</script>
