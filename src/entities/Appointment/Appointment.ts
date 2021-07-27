import { User } from "../User/User"
import { IAppointment } from "./IAppointment"
import { Timestamp } from "./Timestamp"

class Appointment {
  private constructor(
    public readonly User: User,
    public readonly Timestamp: Timestamp,
    public readonly Confirmed: boolean = false
  ) {}

  static create(appointmentData: IAppointment): Appointment {
    const timestampOrError = Timestamp.create(appointmentData.timestamp)

    if (timestampOrError.isLeft()) throw timestampOrError.value

    const timestamp = timestampOrError.value

    return new Appointment(appointmentData.user, timestamp)
  }
}

export { Appointment }
