<template>
	<div>
		<label for="text">Passage</label
		><button class="rounded-md bg-blue-600 text-white ml-5 w-15" @click="fill()">Fill</button>
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
		<ul v-if="answers.length > 0" class="list-disc mt-5 p-5 dark:text-white">
			<li v-for="answer in Array.from(answers)">{{ answer.text }}</li>
		</ul>
		<p v-else-if="sumbited" class="mt-5">No Answer</p>
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
		let sumbited = ref(false);
		let text = ref("");
		let question = ref("");
		let answers: Ref<Answer[]> = ref([]);
		const predict = async () => {
			try {
				answers.value = await model.findAnswers(question.value, text.value);
			} catch (err) {
				if (err instanceof TypeError) {
					if (err.message.includes("Cannot read property")) answers.value = [];
				} else {
					throw err;
				}
			} finally {
				sumbited.value = true;
			}
		};
		let last = 0;
		const sampleTexts = [
			`Alan Mathison Turing (23 June 1912 – 7 June 1954) was an English mathematician, computer scientist, logician, cryptanalyst, philosopher, and theoretical biologist. Turing was highly influential in the development of theoretical computer science, providing a formalization of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general-purpose computer. Turing is widely considered to be the father of theoretical computer science and artificial intelligence.

Born in Maida Vale, London, Turing was raised in southern England. He graduated at King's College, Cambridge with a degree in mathematics. Whilst he was a fellow at Cambridge, he published a proof demonstrating that some purely mathematical yes–no questions can never be answered by computation and defined a Turing machine, and went on to prove the halting problem for Turing machines is undecidable. In 1938, he obtained his PhD from the Department of Mathematics at Princeton University. During the Second World War, Turing worked for the Government Code and Cypher School (GC&CS) at Bletchley Park, Britain's codebreaking center that produced Ultra intelligence. For a time, he led Hut 8, the section that was responsible for German naval cryptanalysis. Here, he devised a number of techniques for speeding the breaking of German ciphers, including improvements to the pre-war Polish bombe method, an electromechanical machine that could find settings for the Enigma machine. Turing played a crucial role in cracking intercepted coded messages that enabled the Allies to defeat the Nazis in many crucial engagements, including the Battle of the Atlantic. Due to the problems of counterfactual history, it is hard to estimate the precise effect Ultra intelligence had on the war, but Professor Jack Copeland has estimated that this work shortened the war in Europe by more than two years and saved over 14 million lives.

After the war, Turing worked at the National Physical Laboratory, where he designed the Automatic Computing Engine. The Automatic Computing Engine was one of the first designs for a stored-program computer. In 1948, Turing joined Max Newman's Computing Machine Laboratory, at the Victoria University of Manchester, where he helped develop the Manchester computers and became interested in mathematical biology. He wrote a paper on the chemical basis of morphogenesis and predicted oscillating chemical reactions such as the Belousov–Zhabotinsky reaction, first observed in the 1960s. Turing was prosecuted in 1952 for homosexual acts; the Labouchere Amendment of 1885 had mandated that "gross indecency" was a criminal offence in the UK. He accepted chemical castration treatment, with DES, as an alternative to prison. Turing died in 1954, 16 days before his 42nd birthday, from cyanide poisoning. An inquest determined his death as a suicide, but it has been noted that the known evidence is also consistent with accidental poisoning.

Despite these accomplishments, he was never fully recognized in his home country during his lifetime because much of his work was covered by the Official Secrets Act. In 2009, following an Internet campaign, British Prime Minister Gordon Brown made an official public apology on behalf of the British government for "the appalling way he was treated". Queen Elizabeth II granted Turing a posthumous pardon in 2013. Turing has an extensive legacy with statues of him, many things named after him including an annual award for computer science innovations. He is due to appear on the Bank of England £50 note, to be released in June 2021. A 2019 BBC series, as voted by the audience, named him the greatest person of the 20th century.
`,
			`Sir Timothy John Berners-Lee (born 8 June 1955), also known as TimBL, is an English computer scientist best known as the inventor of the World Wide Web. He is a Professorial Fellow of Computer Science at the University of Oxford and a professor at the Massachusetts Institute of Technology (MIT). Berners-Lee proposed an information management system on 12 March 1989, then implemented the first successful communication between a Hypertext Transfer Protocol (HTTP) client and server via the Internet in mid-November.

Berners-Lee is the director of the World Wide Web Consortium (W3C) which oversees the continued development of the Web. He is also the founder of the World Wide Web Foundation and is a senior researcher and holder of the 3Com founders chair at the MIT Computer Science and Artificial Intelligence Laboratory (CSAIL). He is a director of the Web Science Research Initiative (WSRI) and a member of the advisory board of the MIT Center for Collective Intelligence. In 2011, he was named as a member of the board of trustees of the Ford Foundation. He is a founder and president of the Open Data Institute and is currently an advisor at social network MeWe.

In 2004, Berners-Lee was knighted by Queen Elizabeth II for his pioneering work. In April 2009, he was elected a Foreign Associate of the National Academy of Sciences. He was named in Time magazine's list of the 100 Most Important People of the 20th century and has received a number of other accolades for his invention. He was honored as the "Inventor of the World Wide Web" during the 2012 Summer Olympics opening ceremony in which he appeared working with a vintage NeXT Computer at the London Olympic Stadium. He tweeted "This is for everyone" which appeared in LCD lights attached to the chairs of the audience. He received the 2016 Turing Award "for inventing the World Wide Web, the first web browser, and the fundamental protocols and algorithms allowing the Web to scale".
`,
			`Nikola Tesla (10 July 1856 – 7 January 1943) was a Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current (AC) electricity supply system.

Born and raised in the Austrian Empire, Tesla studied engineering and physics in the 1870s without receiving a degree, gaining practical experience in the early 1880s working in telephony and at Continental Edison in the new electric power industry. In 1884 he emigrated to the United States, where he became a naturalized citizen. He worked for a short time at the Edison Machine Works in New York City before he struck out on his own. With the help of partners to finance and market his ideas, Tesla set up laboratories and companies in New York to develop a range of electrical and mechanical devices. His alternating current (AC) induction motor and related polyphase AC patents, licensed by Westinghouse Electric in 1888, earned him a considerable amount of money and became the cornerstone of the polyphase system which that company eventually marketed.

Attempting to develop inventions he could patent and market, Tesla conducted a range of experiments with mechanical oscillators/generators, electrical discharge tubes, and early X-ray imaging. He also built a wireless-controlled boat, one of the first-ever exhibited. Tesla became well known as an inventor and demonstrated his achievements to celebrities and wealthy patrons at his lab and was noted for his showmanship at public lectures. Throughout the 1890s, Tesla pursued his ideas for wireless lighting and worldwide wireless electric power distribution in his high-voltage, high-frequency power experiments in New York and Colorado Springs. In 1893, he made pronouncements on the possibility of wireless communication with his devices. Tesla tried to put these ideas to practical use in his unfinished Wardenclyffe Tower project, an intercontinental wireless communication and power transmitter, but ran out of funding before he could complete it.

After Wardenclyffe, Tesla experimented with a series of inventions in the 1910s and 1920s with varying degrees of success. Having spent most of his money, Tesla lived in a series of New York hotels, leaving behind unpaid bills. He died in New York City in January 1943. Tesla's work fell into relative obscurity following his death, until 1960, when the General Conference on Weights and Measures named the SI unit of magnetic flux density the tesla in his honor. There has been a resurgence in popular interest in Tesla since the 1990s.
`,
		];
		const fill = () => (
			(text.value = sampleTexts[last]), last++, (last = last % sampleTexts.length)
		);
		return {
			text,
			question,
			answers,
			predict,
			sumbited,
			fill,
		};
	},
});
</script>
