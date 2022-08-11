export function writeData(newObject, objectCollection) {
	return new Promise((resolve, reject) => {
		try {
			objectCollection.insertOne(newObject);
			resolve();
		} catch (err) {
			reject(err);
		}
	});
}

export function removeData(object, objectCollection) {
	return new Promise((resolve, reject) => {
		try{
			objectCollection.deleteOne({ id: object.id });
			resolve();		} catch (err) {
			reject(err);
		}
	});
}

export function updateData(object, objectCollection) {
	return new Promise((resolve, reject) => {
		try{
			objectCollection.updateOne({ "id": object.id }, { $set: object });
			resolve();		} catch (err) {
			reject(err);
		}
	});
}
