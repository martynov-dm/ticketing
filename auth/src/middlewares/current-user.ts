import {NextFunction, Response, Request} from "express";
import jsonwebtoken from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next()
    }

    try {
        req.currentUser = jsonwebtoken.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    } catch (e) {}
    next()
}
