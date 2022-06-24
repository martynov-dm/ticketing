import {NextFunction, Response, Request} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {validationResult} from "express-validator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    console.log('[asd')

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }

    next()
}
