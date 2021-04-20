<template>
	<p class="m-auto pb-20 text-[25vw] dark:text-white">{{ prediction }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CommonAI from "../util/AI";
import { create } from "@tensorflow-models/speech-commands";

export default defineComponent({
	name: "SpeechCommands",
	setup: async function () {
		let prediction = ref("Start!");
		const model = await CommonAI(async () => await create("BROWSER_FFT"))();
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
