<template>
	<video ref="video" class="hidden" @loadeddata="videoLoaded()"></video>
	<div class="relative">
		<canvas class="top-0 right-0 bottom-0 left-0 z-10 absolute" ref="canvas"></canvas>
		<canvas class="top-0 right-0 bottom-0 left-0 absolute" ref="videoCanvas"></canvas>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref, Ref } from "vue";
import * as comlink from "comlink";

export default defineComponent({
	name: "CommonImage",
	props: {
		WorkerConstructor: {
			type: (Function as unknown) as PropType<new () => Worker>,
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
		const videoCanvas: Ref<null | HTMLCanvasElement> = ref(null);
		const video: Ref<null | HTMLVideoElement> = ref(null);
		let ctx: CanvasRenderingContext2D | null = null;
		let videoCtx: CanvasRenderingContext2D | null = null;
		let worker = new props.WorkerConstructor();
		let WorkerProxy: comlink.Remote<{
			setup: () => Promise<void>;
			predict: (image: ImageData) => Promise<any>;
		}> = comlink.wrap(worker);
		let requestVideoFrameCallback: (callback: () => any) => any;
		let nextFrameData: any;
		onMounted(async () => {
			(video as Ref<HTMLVideoElement>).value.srcObject = await window.navigator.mediaDevices.getUserMedia(
				{
					video: true,
				}
			);
			ctx = canvas.value!.getContext("2d", {
				alpha: true,
			});
			videoCtx = videoCanvas.value!.getContext("2d", {
				alpha: false,
				desynchronized: true,
			});
		});
		onBeforeUnmount(() => {
			worker.terminate();
			(video.value!.srcObject! as MediaStream).getTracks().forEach((track) => track.stop());
		});
		const main = async () => {
			if (!nextFrameData) {
				setTimeout(async () => {
					videoCtx?.drawImage(
						video.value!,
						0,
						0,
						videoCtx?.canvas.width,
						videoCtx?.canvas.height
					);
					WorkerProxy.predict(
						videoCtx!.getImageData(0, 0, ctx!.canvas.width, ctx!.canvas.height)
					).then((data: any) => {
						nextFrameData = data;
					});
				}, 0);
			} else {
				ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				props.draw(nextFrameData!, ctx!);
				nextFrameData = undefined;
			}
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
			ctx!.canvas.style.width = width.toString() + "px";
			videoCtx!.canvas.style.height = height.toString() + "px";
			videoCtx!.canvas.width = width;
			videoCtx!.canvas.height = height;
			videoCtx!.canvas.style.width = width.toString() + "px";
			videoCtx!.canvas.style.height = height.toString() + "px";
			video.value!.width = width;
			video.value!.height = height;
			requestVideoFrameCallback = video.value?.requestVideoFrameCallback
				? video.value?.requestVideoFrameCallback.bind(video.value)
				: requestAnimationFrame;
			await video.value?.play();
			await WorkerProxy.setup();
			requestAnimationFrame(main);
		};
		return {
			canvas,
			videoCanvas,
			video,
			videoLoaded,
		};
	},
});
</script>
