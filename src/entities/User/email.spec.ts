import { Email } from "./Email"

describe("email tester", () => {
  test("Simple Email", () => {
    const emailOrError = Email.create("dicog92523@dedatre.com")

    expect(emailOrError.isRight()).toBeTruthy()
  })

  test("Void Email", () => {
    const emailOrError = Email.create("")

    expect(emailOrError.isRight()).toBeTruthy()
  })

  test("Void Email", () => {
    const emailOrError = Email.create(undefined)

    expect(emailOrError.isRight()).toBeTruthy()
  })

  test("Too long address", () => {
    let sum = ""

    for (let i = 0; i < 64; i++) {
      sum += "a"
    }

    sum += "@gmail.com"

    const emailOrError = Email.create(sum)

    expect(emailOrError.isRight()).toBeFalsy()
  })

  test("Too long domain", () => {
    let sum = "exampleemail@"

    for (let i = 0; i < 64; i++) {
      sum += "a"
    }

    sum += ".com"

    const emailOrError = Email.create(sum)

    expect(emailOrError.isRight()).toBeFalsy()
  })
})
