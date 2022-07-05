import request from "supertest";
import {app} from "../../app";
import {Ticket} from "../../models/ticket";

const createTicket = () => {
   return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asdasdssasd',
            price: 33
        })
}

it('can fetch a list of tickets', async function () {
    await createTicket()
    await createTicket()
    await createTicket()

    const resp = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200)

    expect(resp.body.length).toEqual(3)
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
