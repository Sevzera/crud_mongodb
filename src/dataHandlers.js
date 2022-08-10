export function writeData(newObject, objectCollection) {
    return new Promise((resolve, reject) => {
        objectCollection.insertOne(newObject);
        resolve();
    });
}

export function removeData(object, objectCollection) {
    return new Promise((resolve, reject) => {
        objectCollection.deleteOne({ id: object.id });
        resolve();
    });
}

export function updateData(object, objectCollection) {
    return new Promise((resolve, reject) => {
        objectCollection.updateOne({ "id": object.id }, { $set: object });
        resolve();
    });
}
