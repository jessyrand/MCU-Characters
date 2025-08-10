const request = require('supertest');
const app = require('./index.js');

describe('GET /characters', () => {
    it('should return status 200 and characters array', async () => {
        const res = await request(app).get('/characters');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.characters)).toBe(true);
    });
});

describe('POST /characters', () => {
    it('should create a new character and return it with status 201', async () => {
        const newCharacter = {
            name: "Thor",
            realName: "Thor Odinson",
            universe: "Earth-616"
        };

        const res = await request(app)
            .post('/characters')
            .send(newCharacter)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(newCharacter.name);
        expect(res.body.realName).toBe(newCharacter.realName);
        expect(res.body.universe).toBe(newCharacter.universe);
    });

    it('should return 400 if required fields are missing', async () => {
        const incompleteCharacter = {
            name: "Incomplete",
        };

        const res = await request(app)
            .post('/characters')
            .send(incompleteCharacter)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
