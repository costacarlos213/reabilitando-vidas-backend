import { User } from "../User/User"
import { IAppointment } from "./IAppointment"
import { DateTime } from "./Datetime"

class Appointment {
  private constructor(
    public readonly User: User,
    public readonly Datetime: DateTime,
    public readonly Confirmed: boolean = false
  ) {}

  static create(appointmentData: IAppointment): Appointment {
    const datetimeOrError = DateTime.create(appointmentData.dateTime)

    if (datetimeOrError.isLeft()) throw datetimeOrError.value

    const datetime = datetimeOrError.value

    return new Appointment(appointmentData.user, datetime)
  }
}

export { Appointment }
