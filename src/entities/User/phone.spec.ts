import { Phone } from "./Phone"

describe("Phone validator", () => {
  test("Phone with special chars", () => {
    const phoneOrError = Phone.create("(11) 93485-3853")

    expect(phoneOrError.isRight()).toBeTruthy()
  })

  test("Phone without special chars", () => {
    const phoneOrError = Phone.create("11984294123")

    expect(phoneOrError.isRight()).toBeTruthy()
  })

  test("Phone with invalid DDD", () => {
    const phoneOrError = Phone.create("(00) 983530139")

    expect(phoneOrError.isLeft()).toBeTruthy()
  })

  test("Phone with too much numbers", () => {
    const phoneOrError = Phone.create("98353013342349")

    expect(phoneOrError.isLeft()).toBeTruthy()
  })

  test("Phone with 8 numbers", () => {
    const phoneOrError = Phone.create("(11) 8823-7519")

    expect(phoneOrError.isRight()).toBeTruthy()
  })

  test("Phone starting with 0", () => {
    const phoneOrError = Phone.create("(11) 009384571")

    expect(phoneOrError.isLeft()).toBeTruthy()
  })

  test("Not enough numbers", () => {
    const phoneOrError = Phone.create("9932845")

    expect(phoneOrError.isLeft()).toBeTruthy()
  })

  test("Void Phone", () => {
    const phoneOrError = Phone.create("")

    expect(phoneOrError.isRight()).toBeTruthy()
  })

  test("Void Phone", () => {
    const phoneOrError = Phone.create(undefined)

    expect(phoneOrError.isRight()).toBeTruthy()
  })
})
