import { User } from "../User/User"

export interface IAppointment {
  user: User
  dateTime: string | Date
  comments?: string
  appointmentType?: string
}
