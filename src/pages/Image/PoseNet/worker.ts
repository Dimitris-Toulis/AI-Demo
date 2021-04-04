import { load, getAdjacentKeyPoints, PoseNet } from "@tensorflow-models/posenet";
import Common from "../../../../src/CommonWorker/Image";
Common(load, async (model: PoseNet, image: ImageData) => {
	let results = await model.estimateSinglePose(image);
	return getAdjacentKeyPoints(results.keypoints, 0.5);
});
