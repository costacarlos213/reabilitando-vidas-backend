import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import dayjs from "dayjs"
import parse from "dayjs/plugin/customParseFormat"
import { prisma } from "../../database/client"
import { GetAppointmentByDateUseCase } from "./GetAppointmentByDateUseCase"

dayjs.extend(parse)

describe("Get Appoint by date test", () => {
  const appointmentRepo = new AppointmentRepository()
  const appointmentUseCase = new GetAppointmentByDateUseCase(appointmentRepo)

  afterEach(() => {
    prisma.appointment.deleteMany({
      where: {
        dateTime: dayjs("16/02/2022", "DD/MM/YYYY").format()
      }
    })
  })

  it("Should return a array of appointments", async () => {
    await prisma.appointment.createMany({
      data: [
        {
          dateTime: dayjs("16/02/2022 12:30", "DD/MM/YYYY HH:mm").toISOString(),
          userId: "1"
        },
        {
          dateTime: dayjs("16/02/2022 11:00", "DD/MM/YYYY HH:mm").toISOString(),
          userId: "1"
        },
        {
          dateTime: dayjs("16/02/2022 13:20", "DD/MM/YYYY HH:mm").toISOString(),
          userId: "1"
        }
      ]
    })

    await expect(
      appointmentUseCase.execute(
        dayjs("16/02/2022", "DD/MM/YYYY").toISOString()
      )
    ).resolves.toBeInstanceOf(Array)
  })
})
