import { User } from "../User/User"
import { IAppointment } from "./IAppointment"
import { DateTime } from "./Datetime"

class Appointment {
  private constructor(
    public readonly User: User,
    public readonly Datetime: DateTime,
    public readonly Comments?: string,
    public readonly AppointmentType?: string,
    public readonly Confirmed: boolean = false
  ) {}

  static create(appointmentData: IAppointment): Appointment {
    const datetimeOrError = DateTime.create(appointmentData.dateTime)

    if (datetimeOrError.isLeft()) throw datetimeOrError.value

    const datetime = datetimeOrError.value

    const { user, comments, appointmentType } = appointmentData

    if (appointmentType?.length > 250) {
      throw new Error("Too long appointment type.")
    }

    return new Appointment(user, datetime, comments, appointmentType)
  }
}

export { Appointment }
