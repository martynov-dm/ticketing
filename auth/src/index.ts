import mongoose from "mongoose";
import { DatabaseConnectionError } from "@ticketing-dm/common";

import {app} from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to MongoDb')
    } catch (e) {
        console.log(e)
        throw new DatabaseConnectionError()
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!')
    })
}

start()
