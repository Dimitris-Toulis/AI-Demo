<template>
	<video ref="video" class="hidden" @loadeddata="videoLoaded()"></video>
	<canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref, Ref } from "vue";

export default defineComponent({
	name: "CommonCamera",
	props: {
		ai: {
			type: Function as PropType<(video: HTMLVideoElement) => Promise<any>>,
			required: true,
		},
		draw: {
			type: Function as PropType<
				(results: any, ctx: CanvasRenderingContext2D) => Promise<void>
			>,
			required: true,
		},
		facingMode: {
			type: String,
			required: false,
		},
	},
	setup: async function (props) {
		const canvas: Ref<null | HTMLCanvasElement> = ref(null);
		const video: Ref<null | HTMLVideoElement> = ref(null);
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		let ctx: CanvasRenderingContext2D | null = null;
		let requestVideoFrameCallback: (callback: () => any) => any;
		onMounted(async () => {
			(video as Ref<HTMLVideoElement>).value.srcObject = await window.navigator.mediaDevices.getUserMedia(
				{
					video: {
						facingMode: props.facingMode ?? (isMobile ? "environment" : undefined),
					},
				}
			);
			ctx = canvas.value!.getContext("2d", {
				alpha: false,
				desynchronized: true,
			});
		});
		onBeforeUnmount(() => {
			(video.value!.srcObject! as MediaStream).getTracks().forEach((track) => track.stop());
		});
		const main = async () => {
			let results = await props.ai(video.value!);
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
			ctx!.canvas.style.height =
				Math.min(height * (isMobile ? 1 : 2), window.innerHeight - 150) + "px";

			video.value!.width = width;
			video.value!.height = height;
			requestVideoFrameCallback = video.value?.requestVideoFrameCallback
				? video.value?.requestVideoFrameCallback.bind(video.value)
				: requestAnimationFrame;
			await video.value?.play();
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
