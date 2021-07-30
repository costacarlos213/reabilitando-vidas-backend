import { Appointment } from "@entities/Appointment/Appointment"
import { Appointment as dbAppointment } from "@prisma/client"

export type dayAppointments = dbAppointment & {
  user: {
    cpf: string
    email: string
    name: string
    phone: string
  }
}

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>
  getDayAppointments(dateTime: string): Promise<dayAppointments[]>
}
