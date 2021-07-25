import { User } from "../User/User"
import { Appointment } from "./Appointment"

describe("Appointment create test", () => {
  const userOrError = User.create({
    CPF: "18505342844",
    name: "Carlos Jimmy",
    email: "carlos@jimmt.com",
    phone: "11945508106",
    password: "carlitos13"
  })

  if (userOrError.isLeft()) return false

  const user: User = userOrError.value

  test("New Simple Appointment", () => {
    const appointmentOrError = Appointment.create({
      user: user,
      timestamp: "26/08/2021"
    })

    expect(appointmentOrError.isRight()).toBeTruthy()
  })

  test("Appointment dated before today", () => {
    const appointmentOrError = Appointment.create({
      user: user,
      timestamp: "26-04-2021"
    })

    expect(appointmentOrError.isLeft()).toBeTruthy()
  })
})
