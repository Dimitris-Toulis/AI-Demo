import { load, FaceLandmarksDetector } from "@tensorflow-models/face-landmarks-detection";
import Common from "../../../../src/CommonWorker/Image";
Common(load, async (model: FaceLandmarksDetector, image: ImageData) => {
	return await model.estimateFaces({
		input: image,
	});
});
