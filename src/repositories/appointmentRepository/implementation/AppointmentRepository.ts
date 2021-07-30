import { Appointment } from "@entities/Appointment/Appointment"
import { prisma } from "../../../database/client"
import { Appointment as dbAppointment } from "@prisma/client"
import {
  dayAppointments,
  IAppointmentRepository
} from "../AppointmentRepository"

class AppointmentRepository implements IAppointmentRepository {
  async indexAppointments(): Promise<dbAppointment[]> {
    const appointments = await prisma.appointment.findMany()

    return appointments
  }

  async getDayAppointments(
    initialDateTime: string,
    finalDateTime: string
  ): Promise<dayAppointments[]> {
    const databaseStoredAppointments = await prisma.appointment.findMany({
      where: {
        dateTime: {
          gte: initialDateTime,
          lt: finalDateTime
        }
      },
      include: {
        user: {
          select: {
            cpf: true,
            email: true,
            name: true,
            phone: true
          }
        }
      }
    })

    return databaseStoredAppointments
  }

  async save(appointment: Appointment): Promise<void> {
    const { User, Datetime } = appointment

    const appointmentAlreadyExists = await this.appointmentAlreadyExists(
      Datetime.value
    )

    if (appointmentAlreadyExists)
      throw new Error("There are 2 appointments at the same time")

    await prisma.appointment.create({
      data: {
        dateTime: Datetime.value,
        userId: User.id
      }
    })

    return null
  }

  private async appointmentAlreadyExists(dateTime: string): Promise<boolean> {
    const databaseStoredAppointment = await prisma.appointment.findFirst({
      where: {
        dateTime
      },
      include: {
        user: true
      }
    })

    if (!databaseStoredAppointment) {
      return false
    }

    return true
  }
}

export { AppointmentRepository }
