import supertest from "supertest";
import { app } from "../src/app";
import { login } from "./auth.test";
//import { addExam, delExam, editExam } from '../src/validators/beerValidator';

const request = supertest(app);

describe("POST /api/v1/review/add", () => {
	const url = "/api/v1/review/add";
	test("should drop 401 error", async () => {
		const res = await request.post(url).send({});
		expect(res.statusCode).toBe(401);
	});

	test("should drop 400 ()", async () => {
		const jwt = await login();
		const res = await request.post(url).set("Cookie", jwt).send({});

		console.log("TEST", await res.body);

		expect(res.statusCode).toBe(400);
	});

	//	test('should drop 201', async () => {
	//		const jwt = await login();
	//		const res = await request.post(url).set('Cookie', jwt).send(addExam);
	//
	//		expect(res.statusCode).toBe(201);
	//	});
});

//describe('GET /api/v1/beer/get', () => {
//	const url = '/api/v1/beer/get';
//
//	test('should drop 401', async () => {
//		const res = await request.get(url).send();
//
//		expect(res.statusCode).toBe(401);
//	});
//
//	test('should drop 200', async () => {
//		const jwt = await login();
//		const res = await request.get(url).set('Cookie', jwt).send();
//
//		expect(res.statusCode).toBe(200);
//	});
//});
