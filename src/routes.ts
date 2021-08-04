import { Router } from "express"
import { createAppointmentController } from "./main/createAppointment"
import { createUserController } from "./main/createUser"
import { getAppointmentsByDayController } from "./main/getAppointmentsByDay"
import { indexAppointmentsController } from "./main/indexAppointments"
import { loginUserController } from "./main/loginUser"
import { refreshTokenController } from "./main/refreshToken"
import { verifyRefreshToken } from "./middlewares/verifyRefreshToken"
import { verifyToken } from "./middlewares/verifyToken"

const router = Router()

router.post("/user", async (req, res) => {
  return await createUserController.handler(req, res)
})

router.post("/auth/login", async (req, res) => {
  return await loginUserController.handler(req, res)
})

router.post("/appointment", verifyToken, async (req, res) => {
  return await createAppointmentController.handler(req, res)
})

router.get("/appointment/day", verifyToken, async (req, res) => {
  return await getAppointmentsByDayController.handler(req, res)
})

router.get("/appointment", verifyToken, async (req, res) => {
  return await indexAppointmentsController.handler(req, res)
})

router.get("/token", verifyRefreshToken, async (req, res) => {
  return await refreshTokenController.handle(req, res)
})

export { router }
