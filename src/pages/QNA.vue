<template>
	<div>
		<label for="text" class="dark:text-white">Passage</label
		><button class="rounded-md bg-blue-600 text-white ml-5 w-15" @click="fill()">Fill</button>
		<textarea
			:cols="300"
			id="text"
			v-model="text"
			class="border rounded-md border-gray-500 h-[50%] w-full p-3 resize-none dark:border-none dark:bg-[#3b3b3b] dark:text-gray-100"
		></textarea>
		<label for="question" class="dark:text-white">Question</label>
		<input
			type="text"
			id="question"
			v-model="question"
			class="border rounded-md border-gray-500 h-[10%] text-center w-full dark:border-none dark:bg-[#3b3b3b] dark:text-gray-100"
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
		const model = await CommonAI(load);
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
			`Augusta Ada King, Countess of Lovelace (10 December 1815 – 27 November 1852) was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognize that the machine had applications beyond pure calculation, and to have published the first algorithm intended to be carried out by such a machine. As a result, she is often regarded as one of the first computer programmers.

Ada Byron was the only child of poet Lord Byron and Lady Byron. All of Byron's other children were born out of wedlock to other women. Byron separated from his wife a month after Ada was born and left England forever four months later. He commemorated the parting in a poem that begins, "Is thy face like thy mother's my fair child! ADA! sole daughter of my house and heart?". He died in Greece when Ada was eight years old. Her mother remained bitter and promoted Ada's interest in mathematics and logic in an effort to prevent her from developing her father's perceived insanity. Despite this, Ada remained interested in him, naming her two sons Byron and Gordon. Upon her eventual death, she was buried next to him at her request. Although often ill in her childhood, Ada pursued her studies assiduously. She married William King in 1835. King was made Earl of Lovelace in 1838, Ada thereby becoming Countess of Lovelace.

Her educational and social exploits brought her into contact with scientists such as Andrew Crosse, Charles Babbage, Sir David Brewster, Charles Wheatstone, Michael Faraday and the author Charles Dickens, contacts which she used to further her education. Ada described her approach as "poetical science" and herself as an "Analyst (& Metaphysician)".

When she was a teenager, her mathematical talents led her to a long working relationship and friendship with fellow British mathematician Charles Babbage, who is known as "the father of computers". She was in particular interested in Babbage's work on the Analytical Engine. Lovelace first met him in June 1833, through their mutual friend, and her private tutor, Mary Somerville.

Between 1842 and 1843, Ada translated an article by Italian military engineer Luigi Menabrea on the calculating engine, supplementing it with an elaborate set of notes, simply called "Notes". Lovelace's notes are important in the early history of computers, containing what many consider to be the first computer program—that is, an algorithm designed to be carried out by a machine. Other historians reject this perspective and point out that Babbage's personal notes from the years 1836/1837 contain the first programs for the engine. She also developed a vision of the capability of computers to go beyond mere calculating or number-crunching, while many others, including Babbage himself, focused only on those capabilities. Her mindset of "poetical science" led her to ask questions about the Analytical Engine (as shown in her notes) examining how individuals and society relate to technology as a collaborative tool.

She died of uterine cancer in 1852 at the age of 36.
`,
			`Linus Benedict Torvalds (born 28 December 1969) is a Finnish-American software engineer who is the creator and, historically, the main developer of the Linux kernel, used by Linux distributions and other operating systems such as Android and Chrome OS. He also created the distributed revision control system Git and the scuba dive logging and planning software Subsurface.

He was honored, along with Shinya Yamanaka, with the 2012 Millennium Technology Prize by the Technology Academy Finland "in recognition of his creation of a new open-source operating system for computers leading to the widely used Linux kernel." He is also the recipient of the 2014 IEEE Computer Society Computer Pioneer Award and the 2018 IEEE Masaru Ibuka Consumer Electronics Award.

The first prototypes of Linux were publicly released later in 1991. Version 1.0 was released on 14 March 1994.
`,
			`A computer is a machine that can be programmed to carry out sequences of arithmetic or logical operations automatically. Modern computers can perform generic sets of operations known as programs. These programs enable computers to perform a wide range of tasks. A computer system is a "complete" computer that includes the hardware, operating system (main software), and peripheral equipment needed and used for "full" operation. This term may also refer to a group of computers that are linked and function together, such as a computer network or computer cluster.

A broad range of industrial and consumer products use computers as control systems. Simple special-purpose devices like microwave ovens and remote controls are included, as are factory devices like industrial robots and computer-aided design, as well as general-purpose devices like personal computers and mobile devices like smartphones. Computers power the Internet, which links hundreds of millions of other computers and users.

Early computers were only meant to be used for calculations. Simple manual instruments like the abacus have aided people in doing calculations since ancient times. Early in the Industrial Revolution, some mechanical devices were built to automate long tedious tasks, such as guiding patterns for looms. More sophisticated electrical machines did specialized analog calculations in the early 20th century. The first digital electronic calculating machines were developed during World War II. The first semiconductor transistors in the late 1940s were followed by the silicon-based MOSFET (MOS transistor) and monolithic integrated circuit (IC) chip technologies in the late 1950s, leading to the microprocessor and the microcomputer revolution in the 1970s. The speed, power and versatility of computers have been increasing dramatically ever since then, with transistor counts increasing at a rapid pace (as predicted by Moore's law), leading to the Digital Revolution during the late 20th to early 21st centuries.

Conventionally, a modern computer consists of at least one processing element, typically a central processing unit (CPU) in the form of a microprocessor, along with some type of computer memory, typically semiconductor memory chips. The processing element carries out arithmetic and logical operations, and a sequencing and control unit can change the order of operations in response to stored information. Peripheral devices include input devices (keyboards, mice, joystick, etc.), output devices (monitor screens, printers, etc.), and input/output devices that perform both functions (e.g., the 2000s-era touchscreen). Peripheral devices allow information to be retrieved from an external source and they enable the result of operations to be saved and retrieved.
`,
			`Artificial intelligence (AI) is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals, which involves consciousness and emotionality. The distinction between the former and the latter categories is often revealed by the acronym chosen. 'Strong' AI is usually labelled as artificial general intelligence (AGI) while attempts to emulate 'natural' intelligence have been called artificial biological intelligence (ABI). Leading AI textbooks define the field as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. Colloquially, the term "artificial intelligence" is often used to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving".

Artificial intelligence was founded as an academic discipline in 1955, and in the years since has experienced several waves of optimism, followed by disappointment and the loss of funding (known as an "AI winter"), followed by new approaches, success and renewed funding. After AlphaGo successfully defeated a professional Go player in 2015, artificial intelligence once again attracted widespread global attention. For most of its history, AI research has been divided into sub-fields that often fail to communicate with each other. These sub-fields are based on technical considerations, such as particular goals (e.g. "robotics" or "machine learning"), the use of particular tools ("logic" or artificial neural networks), or deep philosophical differences. Sub-fields have also been based on social factors (particular institutions or the work of particular researchers).

The traditional problems (or goals) of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception and the ability to move and manipulate objects. AGI is among the field's long-term goals. Approaches include statistical methods, computational intelligence, and traditional symbolic AI. Many tools are used in AI, including versions of search and mathematical optimization, artificial neural networks, and methods based on statistics, probability and economics. The AI field draws upon computer science, information engineering, mathematics, psychology, linguistics, philosophy, and many other fields.

In the twenty-first century, AI techniques have experienced a resurgence following concurrent advances in computer power, large amounts of data, and theoretical understanding; and AI techniques have become an essential part of the technology industry, helping to solve many challenging problems in computer science, software engineering and operations research.
`,
			`Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29,2% of Earth's surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other saltwater bodies, but also by lakes, rivers, and other fresh water, which together constitute the hydrosphere. Much of Earth's polar regions are covered in ice. Earth's outer layer is divided into several rigid tectonic plates that migrate across the surface over many millions of years. Earth's interior remains active with a solid iron inner core, a liquid outer core that generates Earth's magnetic field, and a convective mantle that drives plate tectonics.

Earth's atmosphere consists mostly of nitrogen and oxygen. More solar energy is received by tropical regions than polar regions and is redistributed by atmospheric and ocean circulation. Greenhouse gases also play an important role in regulating the surface temperature. A region's climate is not only determined by latitude, but also by elevation, and by proximity to moderating oceans, among other factors. Severe weather, such as tropical cyclones, thunderstorms, and heat waves, occurs in most areas and has a large impact on life.

Earth's gravity interacts with other objects in space, especially the Sun and the Moon, which is Earth's only natural satellite. Earth orbits around the Sun in about 365.25 days. Earth's axis of rotation is tilted with respect to its orbital plane, producing seasons on Earth. The gravitational interaction between Earth and the Moon causes tides, stabilizes Earth's orientation on its axis, and gradually slows its rotation. Earth is the densest planet in the Solar System and the largest and most massive of the four rocky planets.

According to radiometric dating estimation and other evidence, Earth formed over 4.5 billion years ago. Within the first billion years of Earth's history, life appeared in the oceans and began to affect Earth's atmosphere and surface, leading to the proliferation of anaerobic and, later, aerobic organisms. Some geological evidence indicates that life may have arisen as early as 4.1 billion years ago. Since then, the combination of Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive. In the history of life on Earth, biodiversity has gone through long periods of expansion, occasionally punctuated by mass extinctions. Over 99% of all species that ever lived on Earth are extinct. Almost 8 billion humans live on Earth and depend on its biosphere and natural resources for their survival. Humans increasingly impact Earth's surface, hydrology, atmospheric processes and other life.
`,
			`The World Wide Web (WWW), commonly known as the Web, is an information system where documents and other web resources are identified by Uniform Resource Locators (URLs, such as https://example.com/), which may be interlinked by hyperlinks, and are accessible over the Internet. The resources of the Web are transferred via the Hypertext Transfer Protocol (HTTP), may be accessed by users by a software application called a web browser, and are published by a software application called a web server. The World Wide Web is not synonymous with the Internet, which pre-dated the Web in some form by over two decades and upon which technologies the Web is built.

English scientist Sir Timothy Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser in 1990 while employed at CERN near Geneva, Switzerland. The browser was released outside CERN to other research institutions starting in January 1991, and then to the general public in August 1991. The Web began to enter everyday use in 1993-4, when websites for general use started to become available. The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.

Web resources may be any type of downloaded media, but web pages are hypertext documents formatted in Hypertext Markup Language (HTML). Special HTML syntax displays embedded hyperlinks with URLs which permits users to navigate to other web resources. In addition to text, web pages may contain references to images, video, audio, and software components which are either displayed or internally executed in the user's web browser to render pages or streams of multimedia content.

Multiple web resources with a common theme and usually a common domain name, make up a website. Websites are stored in computers that are running a web server, which is a program that responds to requests made over the Internet from web browsers running on a user's computer. Website content can be provided by a publisher, or interactively from user-generated content. Websites are provided for a myriad of informative, entertainment, commercial, and governmental reasons.
`,
			`Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware. It is considered one of the five Big Tech companies alongside Amazon, Facebook, Apple, and Microsoft.

Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14% of its shares and control 56% of the stockholder voting power through super-voting stock. Google was incorporated in California on September 4, 1998. Google was then reincorporated in Delaware on October 22, 2002. In July 2003, Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. The company became a public company via an initial public offering (IPO) on August 19, 2004. In October 2015, Google reorganized as a subsidiary of a conglomerate called Alphabet Inc. Google is Alphabet's largest subsidiary and is a holding company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page, who became the CEO of Alphabet. In 2021, the Alphabet Workers Union was founded, mainly composed of Google employees.

The company's rapid growth since incorporation has included products, acquisitions, and partnerships beyond Google's core search engine, (Google Search). It offers services designed for work and productivity (Google Docs, Google Sheets, and Google Slides), email (Gmail), scheduling and time management (Google Calendar), cloud storage (Google Drive), instant messaging and video chat (Google Duo, Hangouts, Google Chat, and Google Meet), language translation (Google Translate), mapping and navigation (Google Maps, Waze, Google Earth, and Street View), podcast hosting (Google Podcasts), video sharing (YouTube), blog publishing (Blogger), note-taking (Google Keep and Jamboard), and photo organizing and editing (Google Photos). The company leads the development of the Android mobile operating system, the Google Chrome web browser, and Chrome OS, a lightweight operating system based on the Chrome browser. Google has moved increasingly into hardware; from 2010 to 2015, it partnered with major electronics manufacturers in the production of its Google Nexus devices, and it released multiple hardware products in October 2016, including the Google Pixel line of smartphones, Google Home smart speaker, Google Wi-Fi mesh wireless router, and Google Daydream virtual reality headset. Google has also experimented with becoming an Internet carrier (Google Fiber, Google Fi, and Google Station).

Google.com is the most visited website worldwide. Several other Google-owned websites also are on the list of most popular websites, including YouTube and Blogger.

On the list of most valuable brands, Google is ranked second by Forbes and fourth by Interbrand. It has received significant criticism involving issues such as privacy concerns, tax avoidance, antitrust, censorship, and search neutrality.
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
