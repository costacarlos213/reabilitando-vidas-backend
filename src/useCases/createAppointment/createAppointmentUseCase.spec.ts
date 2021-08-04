import { PrismaClient } from "@prisma/client"
import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
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

  beforeAll(async () => {
    await prisma.appointment.deleteMany({
      where: {
        confirmed: false
      }
    })

    await prisma.user.create({
      data: {
        id: "1",
        name: "Test User",
        cpf: "12782234013",
        password: "carlitos13",
        email: "email@email.com",
        phone: "11999126923"
      }
    })
  })

  afterEach(async () => {
    await prisma.appointment.deleteMany({
      where: {
        confirmed: false
      }
    })
  })

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: "1"
      }
    })
  })

  test("Create Simple Appointment", async () => {
    expect(
      await appointmentUseCase.execute({
        cpf: "12782234013",
        dateTime: dayjs("16/02/2022", "DD/MM/YYYY").format()
      })
    ).toBeNull()
  })

  test("Create appointment with date before today", async () => {
    await expect(
      appointmentUseCase.execute({
        cpf: "12782234013",
        dateTime: dayjs("16/02/2021", "DD/MM/YYYY").toISOString()
      })
    ).resolves.toThrowError()
  })

  test("Create appointment with same date", async () => {
    await prisma.appointment.create({
      data: {
        dateTime: dayjs("16/02/2021", "DD/MM/YYYY").toISOString(),
        userId: "1"
      }
    })

    await expect(
      appointmentUseCase.execute({
        cpf: "12782234013",
        dateTime: dayjs("16/02/2021", "DD/MM/YYYY").toISOString()
      })
    ).resolves.toThrowError()
  })
})
