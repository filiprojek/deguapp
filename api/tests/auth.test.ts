import request from "supertest"
import {server as app} from "../server"

describe('Auth API Endpoints', () => {
    afterAll((done) => {
        app.close(done);
    })

    it('should signup new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({});

        expect(res.statusCode).toEqual(200)
        
    })
})
