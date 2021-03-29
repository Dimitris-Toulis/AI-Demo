declare module "ml5";
declare module "virtual:generated-pages";
interface HTMLVideoElement extends HTMLMediaElement {
    requestVideoFrameCallback(callback: () => any): void;
}