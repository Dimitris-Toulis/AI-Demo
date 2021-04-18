<template>
	<p class="m-auto pb-20 text-[25vw] dark:text-white">{{ prediction }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { setBackend, ready, enableProdMode } from "@tensorflow/tfjs-core";
import WasmDefault from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm.wasm?url";
import WasmSimd from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-simd.wasm?url";
import WasmSimdThreads from "~/node_modules/@tensorflow/tfjs-backend-wasm/wasm-out/tfjs-backend-wasm-threaded-simd.wasm?url";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";
import { create } from "@tensorflow-models/speech-commands";

export default defineComponent({
	name: "SpeechCommands",
	setup: async function () {
		let prediction = ref("Start!");
		if (import.meta.env.PROD) enableProdMode();
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
		const model = await create("BROWSER_FFT");
		await model.ensureModelLoaded();
		const wordLabels = model.wordLabels();
		model.listen(async (result) => {
			const word = (() => {
				let word: {
					word: string;
					score: number;
				} = {
					word: "Unknown",
					score: 0,
				};
				(([...result.scores] as unknown) as number[]).forEach((val: number, i: number) => {
					if (word.score < val)
						word = {
							word: wordLabels[i].startsWith("_")
								? wordLabels[i].substring(1, wordLabels[i].length - 1)
								: wordLabels[i],
							score: val,
						};
				});
				return word;
			})();
			prediction.value = word.word;
		});
		return {
			prediction,
			wordLabels,
		};
	},
});
</script>
