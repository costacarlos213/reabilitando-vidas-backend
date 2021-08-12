import { Router } from "express"
import { accountConfirmationController } from "./main/accountConfirmation"
import { createAppointmentController } from "./main/createAppointment"
import { createUserController } from "./main/createUser"
import { getAppointmentsByDayController } from "./main/getAppointmentsByDay"
import { indexAppointmentsController } from "./main/indexAppointments"
import { loginUserController } from "./main/loginUser"
import { logoutController } from "./main/logout"
import { passwordResetController } from "./main/passwordReset"
import { refreshTokenController } from "./main/refreshToken"
import { verifyRefreshToken } from "./middlewares/verifyRefreshToken"
import { verifyToken } from "./middlewares/verifyToken"

const router = Router()

// User account routes
router.post("/user", async (req, res) => {
  return await createUserController.handle(req, res)
})

router.get("/confirmation/:token", async (req, res) => {
  return await accountConfirmationController.handle(req, res)
})

router.get("/password", async (req, res) => {
  return await passwordResetController.handleRequest(req, res)
})

router.post("/password", async (req, res) => {
  return await passwordResetController.handleReset(req, res)
})

// Auth routes
router.post("/auth/login", async (req, res) => {
  return await loginUserController.handler(req, res)
})

router.get("/auth/logout", verifyToken, async (req, res) => {
  return await logoutController.handle(req, res)
})

router.get("/token", verifyRefreshToken, async (req, res) => {
  return await refreshTokenController.handle(req, res)
})

// Appointment routes
router.post("/appointment", verifyToken, async (req, res) => {
  return await createAppointmentController.handler(req, res)
})

router.get("/appointment/day", verifyToken, async (req, res) => {
  return await getAppointmentsByDayController.handler(req, res)
})

router.get("/appointment", verifyToken, async (req, res) => {
  return await indexAppointmentsController.handler(req, res)
})

export { router }
