import { IRepositoryError } from "./repositoryError"

export class InexistentAppointmentError
  extends Error
  implements IRepositoryError
{
  constructor() {
    super(`No appointments in this hour`)
    this.name = "Inexistent Appointment"
  }
}
