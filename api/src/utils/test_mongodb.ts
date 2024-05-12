const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo: any = null;

const connectDB = async () => {
	mongo = await MongoMemoryServer.create({ binary: { os: { os: "linux", dist: "ubuntu", release: "18.04" } } }); // TODO: check that host OS is Void Linux, else remove the argument
	const uri = mongo.getUri();

	await mongoose.connect(uri);
};

const dropDB = async () => {
	if (mongo) {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
		await mongo.stop();
	}
};

const dropCollections = async () => {
	if (mongo) {
		const collections = await mongoose.connection.db.collections();
		for (let collection of collections) {
			await collection.remove();
		}
	}
};

export { connectDB, dropDB, dropCollections };
