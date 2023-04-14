import 'express-async-errors'
import express, {Express} from "express"
import morgan from 'morgan'
import dotenv from 'dotenv'
import {Mongoose} from "./database";
import Config from "./config";
import RequestErrorMiddleware from "./errors/request-error.middleware";

class AppServer {
    protected _express: Express
    protected requestErrorMiddleware: RequestErrorMiddleware

    constructor() {
        this._express = express()
        this.runMainConfiguration()
        this.requestErrorMiddleware = new RequestErrorMiddleware()
    }

    runMainConfiguration(): void {
        //IMPORTANT! Load env configuration first!
        dotenv.config()
        Config.load()

        this._express.use(morgan('dev'))
        this._express.use(express.json())
        this._express.use(express.urlencoded({extended: true}))

        new Mongoose()

        //IMPORTANT! The code below must always after than listen function.
        this._express.use(this.requestErrorMiddleware.validateErrors)

        const port: number = Config.PORT
        this._express.listen(port, () => {
            console.log(`Server running in http://localhost:${port} `);
        })
    }
}

new AppServer()