import request from 'supertest'
import { app } from '../src/app' // assuming your app file is app.ts

describe('User API', () => {
	it('GET / should return 200 and html', async () => {
		const res = await request(app).get('/')
		expect(res.status).toBe(200)
		expect(res.type).toMatch(/html/)
	})

	//it('GET /api/user should return status 200 and JSON object', async () => {
	//	const response = await request(app).get('/api/user')
	//	expect(response.status).toBe(200)
	//	expect(response.type).toMatch(/json/)
	//	expect(response.body).toEqual(expect.any(Object))
	//})
})
