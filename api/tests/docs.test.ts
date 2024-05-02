import request from 'supertest';
import { app } from '../src/app';

describe('GET /api/v1', () => {
	describe('should return json with docs', () => {
		test('should respond with a 200 status code', async () => {
			const response = await request(app).get('/api/v1').send({});
			expect(response.headers['content-type']).toMatch(/json/);
			expect(response.statusCode).toBe(200);
		});
	});
});