import express, { json } from "express"
import { router } from "./routes"
import dotenv from "dotenv"

const app = express()

dotenv.config()

app.use(json())
app.use(router)

export { app }
