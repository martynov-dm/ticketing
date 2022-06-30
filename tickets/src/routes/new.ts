import express, { Request, Response } from "express";
import {requireAuth} from "@ticketing-dm/common/build";

const router = express.Router()

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
    console.log(req.session)
    res.sendStatus(200)
})

export { router as createTicketRouter }
