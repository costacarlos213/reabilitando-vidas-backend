import dayjs from "dayjs"
import CustomParseFormat from "dayjs/plugin/customParseFormat"
import { DateTime } from "./Datetime"
dayjs.extend(CustomParseFormat)

describe("DateTime test", () => {
  test("Simple Date", () => {
    const timestampOrError = DateTime.create("2022-02-15T03:00:00.000Z")

    expect(timestampOrError.isRight()).toBeTruthy()
  })

  test("DateTime before today", () => {
    const timestampOrError = DateTime.create("2021-02-15T03:00:00.000Z")

    expect(timestampOrError.isLeft()).toBeTruthy()
  })

  test("Javacript date object", () => {
    const date = new Date("2022-02-15T03:00:00.000Z")
    const timestampOrError = DateTime.create(date.toString())

    expect(timestampOrError.isRight()).toBeTruthy()
  })
})
