const User = require('../models/User');
const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../api/server');

beforeEach(async () => {
    await db('users').truncate();
});

describe('Auth Routes', () => {
    describe('[POST]: /api/register', () => {

        it('[POST] / registers new post!', () => {
            return request(server)
                .post('/api/register')
                .send({ username: 'Awa', password: '1234' })
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.data.username).toEqual('Awa');
                });
        });

        it('[POST] / returns 201 Created!', () => {
            return request(server)
                .post('/api/register')
                .send({ username: 'Awa', password: '1234' })
                .expect(201)
                .expect('Content-Type', /json/);
        });

        it('[POST] / returns 400 error if no user info provided!', () => {
            return request(server)
                .post('/api/register')
                .send({})
                .expect(400)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.error).toEqual("Please provide all user data");
                })
        });

        it('[POST] / returns 400 error if user already exists!', async () => {
            await User.add({ username: 'Awa', password: '1234' });
            return request(server)
                .post('/api/register')
                .send({ username: 'Awa', password: '1234' })
                .expect(400)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body.error).toEqual("User already exists");
                })
        });
    });

});
