import { PrismaClient } from "@prisma/client"
import { AppointmentRepository } from "@repositories/appointmentRepository/AppointmentRepository"
import { UserRepository } from "@repositories/userRepository/UserRepository"
import dayjs from "dayjs"
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase"
import customParser from "dayjs/plugin/customParseFormat"

dayjs.extend(customParser)

describe("Create appointment feature", () => {
  const userRepo = new UserRepository()
  const appointmentRepo = new AppointmentRepository()
  const appointmentUseCase = new CreateAppointmentUseCase(
    appointmentRepo,
    userRepo
  )
  const prisma = new PrismaClient()

  afterEach(async () => {
    await prisma.appointment.deleteMany({
      where: {
        confirmed: false
      }
    })
  })

  test("Create Simple Appointment", async () => {
    expect(
      await appointmentUseCase.execute({
        cpf: "18505342844",
        timestamp: dayjs("16/02/2022", "DD/MM/YYYY").unix()
      })
    ).toBeNull()
  })
})
