import { MongoMemoryServer } from "mongodb-memory-server";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
    var signin: () => string[];
}

jest.setTimeout(50000);

let mongo: any
beforeAll(async () => {
    process.env.JWT_KEY = 'test'

    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri)
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.signin =  () => {
    // Build a JWT payload { id, email }
    const payload = {
        id: 'asdflkasf123',
        email: 'test@test.com'
    }
    // Create the JWT
    const token = jsonwebtoken.sign(payload, process.env.JWT_KEY!)
    // Build session Object
    const session = { jwt: token }
    // Turn into JSON
    const sessionJSON = JSON.stringify(session)
    // Take JSON and encode is as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')
    // Return encoded string
    return [`session=${base64}`];
}
