import { setBackend, ready, enableProdMode } from "@tensorflow/tfjs-core";
import WasmDefault from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm.wasm?url";
import WasmSimd from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-simd.wasm?url";
import WasmSimdThreads from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-threaded-simd.wasm?url";
import { PoseNet, load, getAdjacentKeyPoints } from "@tensorflow-models/posenet";
import { expose } from "comlink";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";
if (import.meta.env.PROD) enableProdMode();
let model: PoseNet;
expose({
	async setup() {
		setWasmPaths({
			"tfjs-backend-wasm.wasm": import.meta.env.DEV
				? WasmDefault.replace("/@fs", "")
				: WasmDefault,
			"tfjs-backend-wasm-simd.wasm": import.meta.env.DEV
				? WasmSimd.replace("/@fs", "")
				: WasmSimd,
			"tfjs-backend-wasm-threaded-simd.wasm": import.meta.env.DEV
				? WasmSimdThreads.replace("/@fs", "")
				: WasmSimdThreads,
		});
		await setBackend("wasm");
		await ready();
		model = await load();
	},
	async predict(image: ImageData) {
		let results = await model.estimateSinglePose(image);
		return getAdjacentKeyPoints(results.keypoints, 0.5);
	},
});
