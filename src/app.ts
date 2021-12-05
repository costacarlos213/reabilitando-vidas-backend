import express, { json } from "express"
import { router } from "./routes"
import dotenv from "dotenv"
import parse from "dayjs/plugin/customParseFormat"
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config()

app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.use(json())
app.use(router)

dayjs.extend(parse)
dayjs.extend(utc)

export { app }
