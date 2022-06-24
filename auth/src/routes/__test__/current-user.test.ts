import request from "supertest";
import {app} from "../../app";

it('response with detail about current user', async () => {
    const cookie = await signup()

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('response with null is not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null)
})
