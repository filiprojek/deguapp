import supertest from "supertest";
import { app } from "../src/app";
import { login } from "./auth.test";
import { addExam, delExam, editExam } from "../src/validators/beerValidator";

const request = supertest(app);

describe("POST /api/v1/beer/add", () => {
	const url = "/api/v1/beer/add";
	test("should drop 401 error", async () => {
		const res = await request.post(url).send({});
		expect(res.statusCode).toBe(401);
	});

	test("should drop 400 ()", async () => {
		const jwt = await login();
		const res = await request.post(url).set("Cookie", jwt).send({});

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (name)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.name;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400 (degree)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.degree;
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

	test("should drop 400 (brand)", async () => {
		const jwt = await login();
		const body: any = { ...addExam };
		delete body.brand;
		const res = await request.post(url).set("Cookie", jwt).send(body);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 201", async () => {
		const jwt = await login();
		const res = await request.post(url).set("Cookie", jwt).send(addExam);

		expect(res.statusCode).toBe(201);
	});
});

describe("GET /api/v1/beer/get", () => {
	const url = "/api/v1/beer/get";

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

describe("POST /api/v1/beer/del", () => {
	const url = "/api/v1/beer/del";

	test("should drop 401", async () => {
		const res = await request.post(url).send();

		expect(res.statusCode).toBe(401);
	});

	test("should drop 400", async () => {
		const jwt = await login();
		const res = await request.post(url).set("Cookie", jwt).send(delExam);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 400", async () => {
		const jwt = await login();
		const res = await request.post(url).set("Cookie", jwt).send({
			_id: "thisWillNotWork",
		});

		expect(res.statusCode).toBe(400);
	});

	test("should drop 200", async () => {
		const jwt = await login();
		const req = await request.post("/api/v1/beer/add").set("Cookie", jwt).send(addExam);
		const id = req.body.data._id;
		const res = await request.post(url).set("Cookie", jwt).send({
			_id: id,
		});

		expect(res.statusCode).toBe(200);
	});
});

describe("POST /api/v1/beer/edit", () => {
	const url = "/api/v1/beer/edit";

	test("should drop 401", async () => {
		const res = await request.post(url).send();

		expect(res.statusCode).toBe(401);
	});

	test("should drop 400", async () => {
		const jwt = await login();

		const payload: any = { ...editExam };
		delete payload._id;

		const res = await request.post(url).set("Cookie", jwt).send(payload);

		expect(res.statusCode).toBe(400);
	});

	test("should drop 200", async () => {
		const jwt = await login();

		const payload: any = { ...editExam };
		delete payload.name;

		const res = await request.post(url).set("Cookie", jwt).send(payload);

		expect(res.statusCode).toBe(200);
	});

	test("should drop 200", async () => {
		const jwt = await login();

		const payload: any = { ...editExam };
		delete payload.degree;

		const res = await request.post(url).set("Cookie", jwt).send(payload);

		expect(res.statusCode).toBe(200);
	});

	test("should drop 200", async () => {
		const jwt = await login();

		const payload: any = { ...editExam };
		delete payload.packaging;

		const res = await request.post(url).set("Cookie", jwt).send(payload);

		expect(res.statusCode).toBe(200);
	});

	test("should drop 200", async () => {
		const jwt = await login();

		const payload: any = { ...editExam };
		delete payload.brand;

		const res = await request.post(url).set("Cookie", jwt).send(payload);

		expect(res.statusCode).toBe(200);
	});

	test("should drop 200", async () => {
		const jwt = await login();
		const req = await request.post("/api/v1/beer/add").set("Cookie", jwt).send(addExam);
		const _id = req.body.data._id;
		const payload = { ...editExam, _id: _id };

		let res = await request.post(url).set("Cookie", jwt).send(payload);

		delete res.body.data._id;
		delete res.body.data.__v;
		delete res.body.data.createdAt;
		delete res.body.data.updatedAt;
		delete payload._id;

		const eq = JSON.stringify(Object.keys(res.body.data).sort()) === JSON.stringify(Object.keys(payload).sort());
		expect(res.statusCode).toBe(200);
		expect(eq).toBe(true);
	});
});
