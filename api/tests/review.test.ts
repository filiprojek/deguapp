import supertest from "supertest";
import { app } from "../src/app";
import { login } from "./auth.test";
import { addExam, delExam } from "../src/validators/reviewValidator";

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

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (foam)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.foam;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (bitter_sweetness)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.bitter_sweetness;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (taste)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.taste;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (packaging)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.packaging;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (sourness)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.sourness;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (would_again)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.would_again;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 201 (missing note)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.note;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(201);
	})

	test("should drop 201", async () => {
		const jwt = await login();
		const res = await request.post(url).set("Cookie", jwt).send(addExam);

		expect(res.statusCode).toBe(201);
	});
});

describe("GET /api/v1/review/get", () => {
	const url = "/api/v1/review/get";

	test("should drop 401", async () => {
		const res = await request.get(url).send();

		expect(res.statusCode).toBe(401);
	});

	test("should drop 200", async () => {
		const jwt = await login();
		const res = await request.get(url).set("Cookie", jwt).send();

		expect(res.statusCode).toBe(200);
	});
});
