const request = require('supertest');
const app = require('./index.js');

describe('GET /characters', () => {
    it('should return status 200 and characters array', async () => {
        const res = await request(app).get('/characters');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.characters)).toBe(true);
    });
});
