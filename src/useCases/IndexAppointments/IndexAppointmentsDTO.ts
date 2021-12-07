export interface IFilters {
  id?: number
  patientId?: string
  patientName?: string
  patientCpf?: string
  initialDateTime?: string
  finalDateTime?: string
}

export interface IIndexAppointmentsDTO {
  userId: string
  staff: boolean
  filters: IFilters
}
