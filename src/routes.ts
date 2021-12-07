import { Router } from "express"
import { accountConfirmationController } from "./main/accountConfirmation"
import { appointmentConfirmationController } from "./main/appointmentConfirmation"
import { createAppointmentController } from "./main/createAppointment"
import { createUserController } from "./main/createUser"
import { deleteAppointmentController } from "./main/deleteAppointment"
import { getAppointmentsByDayController } from "./main/getAppointmentsByDay"
import { getUserByCPFController } from "./main/getUserByCPF"
import { indexAppointmentsController } from "./main/indexAppointments"
import { loginUserController } from "./main/loginUser"
import { logoutController } from "./main/logout"
import { passwordResetController } from "./main/passwordReset"
import { refreshTokenController } from "./main/refreshToken"
import { updateAppointmentController } from "./main/updateAppointment"
import { verifyRefreshToken } from "./middlewares/verifyRefreshToken"
import { verifyToken } from "./middlewares/verifyToken"

const router = Router()

// User account routes
router.post("/user", async (req, res) => {
  return await createUserController.handle(req, res)
})

router.get("/user", async (req, res) => {
  return await getUserByCPFController.handle(req, res)
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

router.delete("/auth/logout", verifyToken, async (req, res) => {
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

router.get("/appointment/:token", async (req, res) => {
  return await appointmentConfirmationController.handle(req, res)
})

router.put("/appointment", verifyToken, async (req, res) => {
  return await updateAppointmentController.handle(req, res)
})

router.delete("/appointment", verifyToken, async (req, res) => {
  return await deleteAppointmentController.handle(req, res)
})

export { router }
