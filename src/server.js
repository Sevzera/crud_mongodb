import * as dotenv from "dotenv";
import { createServer } from "http";
import { MongoClient } from "mongodb";
import * as data from "./dataControllers.js";

dotenv.config();
console.log(process.env.DB_URL);
MongoClient.connect(process.env.DB_URL)
	.then((client) => {
		// DATABASE CONNECTION & SETUP
		console.log("Connected to Database");
		const db = client.db("objectData");
		const objectCollection = db.collection("objectCollection");
		// SERVER
		const server = createServer((req, res) => {
			const { method, url } = req;
			// GET
			if (method === "GET") {
				if (url.match(/\/get\/?$/)) {
					data.getAllObjects(res, objectCollection);
				} else if (url.match(/\/get\/\d+?$/)) {
					let id = url.split("/")[2];
					data.getObjectById(res, id, objectCollection);
				}
			}
			// POST
			else if (method === "POST" && url.match(/\/post/)) {
				data.addObject(req, res, objectCollection);
			}
			// PUT
			else if (req.method === "PUT" && url.match(/\/put/)) {
				data.updateObject(req, res, objectCollection);
			}
			// DELETE
			else if (req.method === "DELETE" && url.match(/\/delete/)) {
				data.removeObject(req, res, objectCollection);
			} else {
				res.end("error");
			}
		});
		server.listen(process.env.PORT || 5000, () => {});
	})
	.catch((err) => console.error(err));
