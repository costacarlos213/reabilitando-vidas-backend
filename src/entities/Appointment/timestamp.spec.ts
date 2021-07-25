import dayjs from "dayjs"
import { Timestamp } from "./Timestamp"

describe("Timestamp test", () => {
  test("Simple Date", () => {
    const timestampOrError = Timestamp.create("12/02/2023")

    expect(timestampOrError.isRight()).toBeTruthy()
  })

  test("Other format date", () => {
    const timestampOrError = Timestamp.create("12/30/2023")

    expect(timestampOrError.isLeft()).toBeTruthy()
  })

  test("Unix date", () => {
    const unixDate = dayjs("12/05/2022").unix()

    const timestampOrError = Timestamp.create(unixDate)

    expect(timestampOrError.isRight()).toBeTruthy()
  })

  test("Invalid Month", () => {
    const timestampOrError = Timestamp.create("10/42/2023")

    expect(timestampOrError.isRight()).toBeFalsy()
  })

  test("Invalid Day", () => {
    const timestampOrError = Timestamp.create("34/02/2023")

    expect(timestampOrError.isRight()).toBeFalsy()
  })

  test("Diferent date separator", () => {
    const timestampOrError = Timestamp.create("23-02-2022")

    expect(timestampOrError.isRight()).toBeTruthy()
  })
})
