import mongoose from 'mongoose'
import Config from "./config";

export class Mongoose {
    protected _url: string = Config.DATABASE_URL

    constructor() {
        this.mainConfiguration()
    }

    async mainConfiguration() {
        this.connectToDatabase()
    }

    async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(this._url)
            console.log('Successfully connected to database!')
        } catch (e) {
            console.log('Error connecting to database, error log: ' + e)
        }
    }
}