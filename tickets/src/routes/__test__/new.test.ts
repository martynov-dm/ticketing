import request from "supertest";
import {app} from "../../app";

it('has a route handler listening ' +
    'to /api/tickets for post requests ', async function () {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toEqual(404)
});

it('can be accessed when user is signed in', async function () {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
});

it('returns NOT 401 if user is signed in', async function () {
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({})

    expect(response.status).not.toEqual(401)
});

it('returns an error if an invalid title is provided', async function () {

});

it('returns an error if an invalid price is provided', async function () {

});

it('creates a ticket with valid inputs', async function () {

});
