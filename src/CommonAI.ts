import { setBackend, ready, enableProdMode } from "@tensorflow/tfjs-core";
import WasmDefault from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm.wasm?url";
import WasmSimd from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-simd.wasm?url";
import WasmSimdThreads from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-threaded-simd.wasm?url";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";
if (import.meta.env.PROD) enableProdMode();
function setup<T>(load: (config?: any) => Promise<T>, config?: any): () => Promise<T> {
	return async () => {
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
		return await load(config);
	};
}
export default setup;
