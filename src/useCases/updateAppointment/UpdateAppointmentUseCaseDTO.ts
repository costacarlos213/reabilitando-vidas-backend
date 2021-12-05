interface IUser {
  cpf?: string
  email?: string
  name?: string
  phone?: string
}

export interface IUpdateAppointmentFields {
  appointmentType?: string
  comments?: string
  confirmed?: boolean
  dateTime?: string
  user?: IUser
  userId?: string
  id: string
}
