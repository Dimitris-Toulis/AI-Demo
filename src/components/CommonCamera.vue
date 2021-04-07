<template>
	<video ref="video" class="hidden" @loadeddata="videoLoaded()"></video>
	<canvas class="h-full flex-1" ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref, Ref } from "vue";

export default defineComponent({
	name: "CommonCamera",
	props: {
		startup: {
			type: Function as PropType<() => Promise<any>>,
			required: true,
		},
		ai: {
			type: Function as PropType<(model: any, video: HTMLVideoElement) => Promise<any>>,
			required: true,
		},
		draw: {
			type: Function as PropType<
				(results: any, ctx: CanvasRenderingContext2D) => Promise<void>
			>,
			required: true,
		},
	},
	setup: async function (props) {
		const canvas: Ref<null | HTMLCanvasElement> = ref(null);
		const video: Ref<null | HTMLVideoElement> = ref(null);
		let ctx: CanvasRenderingContext2D | null = null;
		let requestVideoFrameCallback: (callback: () => any) => any;
		let model: any;
		onMounted(async () => {
			(video as Ref<HTMLVideoElement>).value.srcObject = await window.navigator.mediaDevices.getUserMedia(
				{
					video: true,
				}
			);
			ctx = canvas.value!.getContext("2d", {
				alpha: false,
				desynchronized: true,
			});
		});
		onBeforeUnmount(() => {
			(video.value!.srcObject! as MediaStream).getTracks().forEach((track) => track.stop());
			model = null;
		});
		const main = async () => {
			if (model == null) return;
			let results = await props.ai(model, video.value!);
			console.log(results);
			ctx?.drawImage(video.value!, 0, 0, ctx.canvas.width, ctx.canvas.height);
			props.draw(results, ctx!);
			requestVideoFrameCallback(main);
		};
		const videoLoaded = async () => {
			const height = (video.value!.srcObject! as MediaStream)
				.getVideoTracks()[0]
				.getSettings().height!;
			const width = (video.value!.srcObject! as MediaStream).getVideoTracks()[0].getSettings()
				.width!;

			ctx!.canvas.width = width;
			ctx!.canvas.height = height;

			video.value!.width = width;
			video.value!.height = height;
			requestVideoFrameCallback = video.value?.requestVideoFrameCallback
				? video.value?.requestVideoFrameCallback.bind(video.value)
				: requestAnimationFrame;
			await video.value?.play();
			model = await props.startup();
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
