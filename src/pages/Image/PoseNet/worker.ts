import "@tensorflow/tfjs-backend-webgl";
//import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
//import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";
//import WasmDefault from "@/node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm?url";
//import WasmSimd from "@/node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-simd?url";
//import WasmSimdThreads from "@/node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-threaded-simd?url";
import * as posenet from "@tensorflow-models/posenet";
import * as comlink from "comlink";
/*setWasmPaths({
	"tfjs-backend-wasm.wasm": WasmDefault,
	"tfjs-backend-wasm-simd.wasm": WasmSimd,
	"tfjs-backend-wasm-threaded-simd.wasm": WasmSimdThreads,
});*/
//await tf.setBackend("wasm");
let model: posenet.PoseNet;
comlink.expose({
	async setup() {
		model = await posenet.load();
	},
	async predict(image: ImageData) {
		let results = await model.estimateSinglePose(image);
		return posenet.getAdjacentKeyPoints(results.keypoints, 0.5);
	},
});
