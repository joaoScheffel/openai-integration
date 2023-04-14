import {NextFunction, Request, Response} from "express";
import {RestError} from "./rest-error";
import Config from "../config";

export default class RequestErrorMiddleware {
    async validateErrors(error: Error & Partial<RestError>, req: Request, res: Response, next: NextFunction) {
        const statusCode = error?.statusCode || 500
        const message = error?.message || 'Internal Server Error'
        const stack = error?.stack || ''
        const name = error?.name
        const origin = error?.origin

        const isDevelopment = Config.NODE_ENV === 'development'

        res.status(statusCode).json({
            message: message,
            name: name,
            origin: isDevelopment ? origin : undefined,
            stack: isDevelopment ? stack : undefined
        })

        return
    }
}

