import { Appointment } from "@entities/Appointment/Appointment"
import { Appointment as dbAppointment } from "@prisma/client"
import { IFilters } from "@useCases/indexAppointments/IndexAppointmentsDTO"

export type dayAppointments = dbAppointment & {
  user: {
    cpf: string
    email: string
    name: string
    phone: string
  }
}

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<string>
  getDayAppointments(
    initialDateTime: string,
    finalDateTime
  ): Promise<dayAppointments[]>
  indexAppointments(filters?: IFilters): Promise<dayAppointments[]>
  updateAppointment(
    field: Record<string, unknown>,
    appointmentId: number
  ): Promise<void>
  deleteAppointment(appointmentId: number): Promise<void>
}
