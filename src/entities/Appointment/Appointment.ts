import { Either, left, right } from "@shared/either"
import { InvalidDateTimeError } from "../errors/invalidDateTime"
import { User } from "../User/User"
import { IAppointmentDTO } from "./IAppointmentDTO"
import { Timestamp } from "./Timestamp"

class Appointment {
  private constructor(
    public readonly User: User,
    public readonly Timestamp: Timestamp,
    public readonly Confirmed: boolean = false
  ) {}

  static create(
    appointmentData: IAppointmentDTO
  ): Either<InvalidDateTimeError, Appointment> {
    const timestampOrError = Timestamp.create(appointmentData.timestamp)

    if (timestampOrError.isLeft()) return left(timestampOrError.value)

    const timestamp = timestampOrError.value

    return right(new Appointment(appointmentData.user, timestamp))
  }
}

export { Appointment }
