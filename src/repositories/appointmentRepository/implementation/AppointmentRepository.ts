import { Appointment } from "@entities/Appointment/Appointment"
import { User } from "@entities/User/User"
import { prisma } from "../../../database/client"
import { IAppointmentRepository } from "../AppointmentRepository"

class AppointmentRepository implements IAppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    const { User, Timestamp } = appointment

    const sameTimestampAppointment = await this.getAppointmentByTimestamp(
      Timestamp.value
    )

    if (sameTimestampAppointment)
      throw new Error("There are 2 appointments at the same time")

    await prisma.appointment.create({
      data: {
        timestamp: Timestamp.value,
        userId: User.id
      }
    })

    return null
  }

  async getAppointmentByTimestamp(
    timestamp: number
  ): Promise<Appointment | null> {
    const databaseStoredAppointment = await prisma.appointment.findFirst({
      where: {
        timestamp
      },
      include: {
        user: true
      }
    })

    if (!databaseStoredAppointment) {
      return
    }

    const user = User.create({
      id: databaseStoredAppointment.userId,
      email: databaseStoredAppointment.user.email,
      cpf: databaseStoredAppointment.user.cpf,
      name: databaseStoredAppointment.user.cpf,
      phone: databaseStoredAppointment.user.phone
    })

    const appointment = Appointment.create({
      user: user,
      timestamp: databaseStoredAppointment.timestamp
    })

    return appointment
  }
}

export { AppointmentRepository }
