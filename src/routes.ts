import { Router } from "express"
import { createAppointmentController } from "./main/createAppointment"
import { createUserController } from "./main/createUser"

const router = Router()

router.post("/user", async (req, res) => {
  return (await createUserController).handler(req, res)
})

router.post("/appointment", async (req, res) => {
  return (await createAppointmentController).handler(req, res)
})

export { router }
