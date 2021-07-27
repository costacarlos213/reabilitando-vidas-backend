import dayjs from "dayjs"
import { User } from "../User/User"
import { Appointment } from "./Appointment"
import CustomParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(CustomParseFormat)

describe("Appointment create test", () => {
  const user = User.create({
    cpf: "18505342844",
    name: "Carlos Jimmy",
    email: "carlos@jimmt.com",
    phone: "11945508106",
    password: "carlitos13"
  })

  test("New Simple Appointment", () => {
    const appointment = Appointment.create({
      user: user,
      timestamp: dayjs("26/08/2021", "DD/MM/YYYY").unix()
    })

    expect(appointment).toBeInstanceOf(Appointment)
  })

  test("Appointment dated before today", () => {
    expect(() => {
      Appointment.create({
        user: user,
        timestamp: dayjs("26-04-2021", "DD-MM-YYYY").unix()
      })
    }).toThrowError()
  })
})
