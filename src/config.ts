import dotenv from "dotenv";

class Config {
    static PORT: number
    static NODE_ENV: string
    static DATABASE_URL: string
    static SECRET: string

    static load(): void {
        dotenv.config()

        this.PORT = parseInt(process.env.PORT || "3333", 10)
        this.NODE_ENV = process.env.NODE_ENV || "development"
        this.DATABASE_URL = process.env.DATABASE_URL || ""
        this.SECRET = process.env.SECRET || ""

        this.validate()
    }

    private static validate(): void {
        const requiredVariables: string[] = [
            "PORT",
            "NODE_ENV",
            "DATABASE_URL",
            "SECRET"
        ]

        for (const variable of requiredVariables) {
            if (!this[variable]) {
                throw new Error(`Environment variable ${variable} is not set.`)
            }
        }
    }
}

export default Config