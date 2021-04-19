<template>
	<div>
		<label for="text">Passage</label>
		<textarea
			:cols="300"
			id="text"
			v-model="text"
			class="border rounded-md border-gray-500 h-[50%] w-full p-3 resize-none dark:border-none"
		></textarea>
		<label for="question">Question</label>
		<input
			type="text"
			id="question"
			v-model="question"
			class="border rounded-md border-gray-500 h-[10%] text-center w-full dark:border-none"
		/>
		<button @click="predict()" class="bg-blue-600 h-[5%] mt-5 text-white w-full">Submit</button>
		<ul class="list-disc p-5 dark:text-white">
			<li v-for="answer in Array.from(answers)">{{ answer.text }}</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { load } from "@tensorflow-models/qna";
import { Answer } from "@tensorflow-models/qna/dist/question_and_answer";
import CommonAI from "../util/AI";

export default defineComponent({
	name: "QNA",
	setup: async () => {
		const model = await CommonAI(load)();
		let text = ref("");
		let question = ref("");
		let answers: Ref<Answer[]> = ref([]);
		const predict = async () =>
			(answers.value = await model.findAnswers(question.value, text.value));
		return {
			text,
			question,
			answers,
			predict,
		};
	},
});
</script>
