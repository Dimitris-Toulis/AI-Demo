import { setBackend, ready, enableProdMode, getBackend } from "@tensorflow/tfjs-core";
import WasmDefault from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm.wasm?url";
import WasmSimd from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-simd.wasm?url";
import WasmSimdThreads from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-threaded-simd.wasm?url";
import { simd } from "wasm-feature-detect";

if (import.meta.env.PROD) enableProdMode();
function setup<T, U>(load: (config?: U) => Promise<T>, config?: U): () => Promise<T> {
	return async () => {
		if (await simd()) {
			const { setWasmPaths } = await import("@tensorflow/tfjs-backend-wasm");
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
		} else {
			await import("@tensorflow/tfjs-backend-webgl");
			await setBackend("webgl");
		}
		console.log(getBackend());
		await ready();
		return await load(config);
	};
}
export default setup;
