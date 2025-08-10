import request from 'supertest';
import app from './index.js';

describe('GET /characters', () => {
    it('should return all characters', async () => {
        const response = await request(app).get('/characters');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('characters');
        expect(Array.isArray(response.body.characters)).toBe(true);
    });
});
