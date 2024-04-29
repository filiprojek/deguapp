import { connectDB, dropDB, dropCollections } from '../src/utils/test_mongodb';

beforeAll(async () => {
	await connectDB();
});

afterAll(async () => {
	await dropDB();
});
