import * as handler from "./dataHandlers.js";
import { getReqBody } from "./utils/getReqBody.js";

export async function getAllObjects(res, objectCollection) {
	const allData = await objectCollection.find().toArray();
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify(allData));
}

export async function getObjectById(res, id, objectCollection) {
	const objectsById = await objectCollection.find({ id: id.toString() }).toArray();
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify(objectsById));
}

export async function addObject(req, res, objectCollection) {
	const body = await getReqBody(req);
	const object = JSON.parse(body);
	handler.writeData(object, objectCollection)
		.then(() => {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end("Object_#" + object.id + "_has_been_successfully_added_to_DB");
		})
		.catch(err => console.error(err));
}

export async function updateObject(req, res, objectCollection) {
	const body = await getReqBody(req);
	const object = JSON.parse(body);
	handler.updateData(object, objectCollection)
		.then(() => {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end("Object_#" + object.id + "_has_been_successfully_updated");
		})
		.catch(err => console.error(err));
}

export async function removeObject(req, res, objectCollection) {
	const body = await getReqBody(req);
	const object = JSON.parse(body);
	handler.removeData(object, objectCollection)
		.then(() => {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end("Object_#" + object.id + "_has_been_successfully_removed_from_DB");
		})
		.catch(err => console.error(err));
}