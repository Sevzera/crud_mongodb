export async function getReqBody(req) {
	return new Promise((resolve, reject) => {
		let body = [];
		try {
			req.on("data", chunk => {
				body.push(chunk);
			}).on("end", () => {
				body = Buffer.concat(body).toString();
				resolve(body);
			});
		} catch (err) {
			reject(err);
		}
	});
}