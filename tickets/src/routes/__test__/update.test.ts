import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";

it('returns 404 if the id does not exist', async function () {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'adsfa',
            price: 23
        })
        .expect(404)
});

it('returns 401 if the user in not authenticated', async function () {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'adsfa',
            price: 23
        })
        .expect(401)
});

it('returns 401 if the user does not own the ticket', async function () {
   const resp =  await request(app)
        .post(`/api/tickets/`)
        .set('Cookie', global.signin())
        .send({
            title: 'adsfa',
            price: 23
        })

    await request(app)
        .put(`/api/tickets/${resp.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'sdfsdfsdf',
            price: 1000
        })
        .expect(401)
});

it('returns 400 if the user provides an invalid title or price', async function () {
    const cookie = global.signin()
    const resp =  await request(app)
        .post(`/api/tickets/`)
        .set('Cookie', cookie)
        .send({
            title: 'adsfa',
            price: 23
        })

    await request(app)
        .put(`/api/tickets/${resp.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${resp.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asfasfasf',
            price: -20
        })
        .expect(400)
});

it('updates the ticket', async function () {
    const cookie = global.signin()
    const title = 'new title'
    const price = 2000
    const resp =  await request(app)
        .post(`/api/tickets/`)
        .set('Cookie', cookie)
        .send({
            title: 'adsfa',
            price: 23
        })

    await request(app)
        .put(`/api/tickets/${resp.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: title,
            price: price
        })
        .expect(200)

    const ticketResp = await request(app)
        .get(`/api/tickets/${resp.body.id}`)
        .send()
        .expect(200)

    expect(ticketResp.body.title).toEqual(title)
    expect(ticketResp.body.price).toEqual(price)
});
