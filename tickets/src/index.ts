import mongoose from "mongoose";
import { DatabaseConnectionError } from "@ticketing-dm/common";

import {app} from "./app";

const start = async () => {
    if (!process.env.TICKETS_MONGO_URI) {
        throw new Error('TICKETS_MONGO_URI must be defined')
    }

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }

    try {
        await mongoose.connect(process.env.TICKETS_MONGO_URI)
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
