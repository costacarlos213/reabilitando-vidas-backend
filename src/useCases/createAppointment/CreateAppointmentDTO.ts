interface IUser {
  id: string
  cpf: string
  email: string
  name: string
  phone: string
}

export interface ICreateAppointmentDTO {
  dateTime: string
  patient: IUser
  userId: string
  appointmentType?: string
  comments?: string
}
