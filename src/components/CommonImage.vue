<template>
	<video ref="video" class="hidden" @loadeddata="videoLoaded()"></video>
	<canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref } from "vue";

export default defineComponent({
	name: "CommonImage",
	props: {
		startup: {
			type: Function as PropType<(video:HTMLVideoElement)=>Promise<any>> ,
			required: true,
		},
		ai: {
			type: Function as PropType<(model: any, video: HTMLVideoElement)=>Promise<any>>,
			required: true,
		},
		draw: {
			type: Function as PropType<(results: any, ctx:CanvasRenderingContext2D)=>Promise<void>>,
			required: true,
		},
	},
	setup: async function (props) {
		const canvas: Ref<null | HTMLCanvasElement> = ref(null);
		const video: Ref<null | HTMLVideoElement> = ref(null);
		let ctx: CanvasRenderingContext2D | null = null;
		let model : any;
		let requestVideoFrameCallback : (callback:()=>any)=>any;
		const startup = async () => {
			const videoStream = await window.navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: "user",
				},
			});
			(video as Ref<HTMLVideoElement>).value.srcObject = videoStream;
			ctx = canvas.value!.getContext("2d");
		};
		onMounted(startup);
		const main = async()=>{
			const results = await props.ai(model,video.value!)
			ctx?.drawImage(video.value!, 0, 0, ctx?.canvas.width, ctx?.canvas.height);
			await props.draw(results,ctx!);
			requestVideoFrameCallback(main);
		}
		const videoLoaded = async () => {
			const height = (video.value!.srcObject! as MediaStream)
				.getVideoTracks()[0]
				.getSettings().height!;
			const width = (video.value!.srcObject! as MediaStream).getVideoTracks()[0].getSettings()
				.width!;
			ctx!.canvas.width = width;
			ctx!.canvas.height = height;
			ctx!.canvas.style.width = width.toString() + "px";
			ctx!.canvas.style.height = height.toString() + "px";
			video.value!.width = width;
			video.value!.height = height;
			requestVideoFrameCallback = video.value?.requestVideoFrameCallback ? video.value?.requestVideoFrameCallback.bind(video.value) : requestAnimationFrame;
			await video.value?.play();
			model = await props.startup(video.value!);
			requestAnimationFrame(main);
		};
		return {
			canvas,
			video,
			videoLoaded,
		};
	},
});
</script>
