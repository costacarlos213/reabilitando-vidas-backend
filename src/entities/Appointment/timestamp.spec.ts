import dayjs from "dayjs"
import CustomParseFormat from "dayjs/plugin/customParseFormat"
import { Timestamp } from "./Timestamp"
dayjs.extend(CustomParseFormat)

describe("Timestamp test", () => {
  test("Simple Date", () => {
    const timestampOrError = Timestamp.create(
      dayjs("16/02/2023", "DD/MM/YYYY", true).unix()
    )

    expect(timestampOrError.isRight()).toBeTruthy()
  })

  test("Timestamp before today", () => {
    const timestampOrError = Timestamp.create(
      dayjs("23/02/2022", "DD/MM/YYYY").unix()
    )

    expect(timestampOrError.isRight()).toBeTruthy()
  })
})
