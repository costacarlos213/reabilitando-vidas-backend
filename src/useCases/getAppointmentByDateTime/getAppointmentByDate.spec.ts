import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import dayjs from "dayjs"
import parse from "dayjs/plugin/customParseFormat"
import { prisma } from "../../database/client"
import { GetAppointmentByDateUseCase } from "./GetAppointmentByDateUseCase"

dayjs.extend(parse)

describe("Get Appoint by date test", () => {
  const appointmentRepo = new AppointmentRepository()
  const appointmentUseCase = new GetAppointmentByDateUseCase(appointmentRepo)

  beforeAll(async () => {
    await prisma.appointment.createMany({
      data: [
        {
          dateTime: "2022-07-30T12:00:00.000Z",
          userId: "1"
        },
        {
          dateTime: "2022-07-30T12:30:00.000Z",
          userId: "1"
        },
        {
          dateTime: "2022-02-200T13:00:00.000Z",
          userId: "1"
        },
        {
          dateTime: dayjs("16/02/2022 12:30", "DD/MM/YYYY HH:mm").toISOString(),
          userId: "1"
        },
        {
          dateTime: dayjs("16/02/2022 11:00", "DD/MM/YYYY HH:mm").toISOString(),
          userId: "1"
        }
      ]
    })
  })

  afterAll(async () => {
    await prisma.appointment.deleteMany({
      where: {
        dateTime: {
          gte: dayjs("16/02/2022", "DD/MM/YYYY").format(),
          lt: dayjs("16/02/2022", "DD/MM/YYYY").add(1, "day").format()
        }
      }
    })
  })

  it("Should return a array of appointments", async () => {
    await expect(
      appointmentUseCase.execute({
        initialDate: dayjs("16/02/2022", "DD/MM/YYYY").toISOString(),
        finalDate: dayjs("16/02/2022", "DD/MM/YYYY").toISOString()
      })
    ).resolves.toHaveLength(2)
  })

  it("Shouldn't return appointments", async () => {
    await expect(
      appointmentUseCase.execute({
        initialDate: dayjs("16/03/2022", "DD/MM/YYYY").toISOString(),
        finalDate: dayjs("16/03/2022", "DD/MM/YYYY").toISOString()
      })
    ).resolves.toEqual([])
  })

  it("Should return all appointments", async () => {
    await expect(
      appointmentUseCase.execute({
        initialDate: dayjs("16/03/2021", "DD/MM/YYYY").toISOString(),
        finalDate: dayjs("16/06/2023", "DD/MM/YYYY").toISOString()
      })
    ).resolves.toHaveLength(5)
  })
})
