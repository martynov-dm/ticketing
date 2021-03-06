import request from "supertest";
import {app} from "../../app";
import {Ticket} from "../../models/ticket";

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
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400)
});

it('returns an error if an invalid price is provided', async function () {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asadasd',
            price: -10
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asadasd',
        })
        .expect(400)
});

it('creates a ticket with valid inputs', async function () {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    const title = 'asadasd'

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20
        })
        .expect(201)

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(20)
    expect(tickets[0].title).toEqual(title)
});
