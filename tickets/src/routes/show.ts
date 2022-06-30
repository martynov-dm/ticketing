import express, { Request, Response } from "express";
import {NotFoundError, validateRequest} from "@ticketing-dm/common/build";
import {Ticket} from "../models/ticket";

const router = express.Router()

router.get('/api/tickets/:id', validateRequest, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id).lean()

    if (!ticket) {
        throw new NotFoundError()
    }

    return res.send(ticket)
})

export { router as showTicketRouter }
