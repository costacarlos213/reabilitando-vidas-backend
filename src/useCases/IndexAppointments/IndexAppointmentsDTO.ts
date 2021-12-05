export interface IFilters {
  id?: string
  patientName?: string
  patientCpf?: string
  initialDateTime?: string
  finalDateTime?: string
}

export interface IIndexAppointmentsDTO {
  userId
  filters: IFilters
}
