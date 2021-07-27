import { Appointment } from "@entities/Appointment/Appointment"

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>
  getAppointmentByTimestamp(timestamp: number): Promise<Appointment>
}
