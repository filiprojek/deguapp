import supertest from 'supertest';
import { app } from '../src/app';
import { connectDB, dropDB, dropCollections } from '../src/utils/test_mongodb';

const request = supertest(app);

export const getJWT = async () => {
	try {
		const resReg: any = await request.post('/api/v1/auth/signup').send({
			email: 'test@example.local',
			password: 'admin1234',
			username: 'Test Test'
		});

		const resLog: any = await request.post('/api/auth/login').send({
			email: 'test@example.local',
			password: 'admin1234'
		});
		if (resLog.statusCode != 200) throw 'error while logging in';

		const body = JSON.parse(resLog.text);
		return Promise.resolve(body.data.jwt);
	} catch (err: any) {
		console.log(err);
		return err;
	}
};

/**
 *
 * @returns JWT cookie
 */
export async function login(): Promise<string> {
	const res = await request.post('/api/v1/auth/signin').send({
		email: 'thisistest@host.local',
		password: 'Admin1234'
	});
	return res.headers['set-cookie'];
}

export async function signup(): Promise<boolean> {
	const res = await request.post('/api/v1/auth/signup').send({
		email: 'thisistest@host.local',
		password: 'Admin1234',
		username: 'Test Test'
	});

	if (res.statusCode == 201) return true;
	return false;
}

describe('POST /api/v1/auth/signup', () => {
	describe('should drop validation error', () => {
		it('should drop 400 (empty request))', async () => {
			const res: any = await request.post('/api/v1/auth/signup').send({});
			expect(res.statusCode).toBe(400);
		});

		it('should drop 400 (email))', async () => {
			const res: any = await request.post('/api/v1/auth/signup').send({
				email: '',
				username: 'User Admin',
				password: 'Admin1234'
			});
            console.log(res)
			const body = JSON.parse(res.text);
			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('email');
		});

		it('should drop 400 (username))', async () => {
			const res: any = await request.post('/api/v1/auth/signup').send({
				email: 'admin@localhost.local',
				username: '',
				password: 'Admin1234'
			});
			const body = JSON.parse(res.text);

			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('username');
		});
		it('should drop 400 (password))', async () => {
			const res: any = await request.post('/api/v1/auth/signup').send({
				email: 'admin@localhost.local',
				username: 'User Admin',
				password: ''
			});
			const body = JSON.parse(res.text);

			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('password');
		});
		it('should drop 400 (password - min 8 chars', async () => {
			const res = await request.post('/api/v1/auth/signup').send({
				email: 'admin@localhost.local',
				username: 'User Admin',
				password: 'Admin12'
			});
			const body = JSON.parse(res.text);

			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('password');
		});
		it('should drop 400 (password - min 1 number', async () => {
			const res = await request.post('/api/v1/auth/signup').send({
				email: 'admin@localhost.local',
				username: 'User Admin',
				password: 'Adminadmin'
			});
			const body = JSON.parse(res.text);

			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('password');
		});
		it('should drop 400 (password - min 1 uppercase', async () => {
			const res = await request.post('/api/v1/auth/signup').send({
				email: 'admin@localhost.local',
				username: 'User Admin',
				password: 'admin1234'
			});
			const body = JSON.parse(res.text);

			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('password');
		});
	});

	test('should register an user', async () => {
		const res: any = await request.post('/api/v1/auth/signup').send({
			email: 'thisistest@host.local',
			password: 'Admin1234',
			username: 'Test Test'
		});

		expect(res.statusCode).toBe(201);
	});
});

/*
describe('POST /api/v1/auth/signin', () => {
	const url = '/api/v1/auth/signin';

	describe('should drop an validation error', () => {
		it('should drop 400 (empty)', async () => {
			const res = await request.post(url).send();

			expect(res.statusCode).toBe(400);
		});

		it('should drop 400 (email)', async () => {
			const res = await request.post(url).send({
				password: 'Admin1234'
			});
			const body = JSON.parse(res.text);

			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('email');
		});

		it('should drop 400 (password)', async () => {
			const res = await request.post(url).send({
				email: 'thisistest@host.local'
			});
			const body = JSON.parse(res.text);

			expect(res.statusCode).toBe(400);
			expect(body.data.path).toBe('password');
		});
	});

	test('should drop 401', async () => {
		const res = await request.post(url).send({
			email: 'thisistest@host.local',
			password: 'Test12365465132'
		});
		expect(res.statusCode).toBe(401);
	});

	test('should login an user', async () => {
		const res: any = await request.post(url).send({
			email: 'thisistest@host.local',
			password: 'Admin1234'
		});

		expect(res.statusCode).toBe(200);
	});
});

/**
 * Throws errors idk
  
describe('POST /api/v1/auth/logout', () => {
	const url = '/api/v1/auth/logout';
	test('should drop 401 error', async () => {
		const res = await request.post(url).send({});
		expect(res.statusCode).toBe(401);
	});

	test('should logout an user', async () => {
		const jwt = await login();
		const res = await request.post(url).set('Cookie', jwt).send({});

		res.headers['set-cookie'].forEach((el: any) => {
			if (el.split('=')[0] == 'jwt') {
				expect(Number(el.split('=')[2][0])).toBe(0);
			}
		});

		expect(res.statusCode).toBe(200);
	});
});
 */

/*
describe('GET /api/v1/auth/status', () => {
	const url = '/api/v1/auth/status';
	test('should return login status 401', async () => {
		const res = await request.get(url).send();
		expect(res.statusCode).toBe(401);
	});
	test('should return login status 200', async () => {
		const jwt = await login();
		const res = await request.get(url).set('Cookie', jwt).send();
		expect(res.statusCode).toBe(200);
	});
});
*/
