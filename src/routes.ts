import { Router } from "express"
import { createAppointmentController } from "./main/createAppointment"
import { createUserController } from "./main/createUser"
import { getAppointmentsByDayController } from "./main/getAppointmentsByDay"
import { indexAppointmentsController } from "./main/indexAppointments"

const router = Router()

router.post("/user", async (req, res) => {
  return (await createUserController).handler(req, res)
})

router.post("/appointment", async (req, res) => {
  return (await createAppointmentController).handler(req, res)
})

router.get("/appointment/day", async (req, res) => {
  return (await getAppointmentsByDayController).handler(req, res)
})

router.get("/appointment", async (req, res) => {
  return (await indexAppointmentsController).handler(req, res)
})

export { router }
