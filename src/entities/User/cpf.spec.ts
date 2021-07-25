import { CPF } from "./CPF"

describe("CPF Validator", () => {
  test("Create CPF with special chars", () => {
    const cpfOrError = CPF.create("109.831.850-18")

    expect(cpfOrError.isRight()).toBeTruthy()
  })

  test("Clean CPF", () => {
    const cpf = CPF.create("72525918088")

    expect(cpf.isRight()).toBeTruthy()
  })

  test("CPF With random special chars", () => {
    const cpf = CPF.create("1$0&9.8@3-1.#8)5)0-1!8")

    expect(cpf.isRight()).toBeFalsy()
  })

  test("Too Much digits CPF", () => {
    const cpf = CPF.create("231.1334.440-47")

    expect(cpf.isRight()).toBeFalsy()
  })

  test("Wrong First checker", () => {
    const cpf = CPF.create("02404381023")

    expect(cpf.isRight()).toBeFalsy()
  })

  test("Wrong Second Checker", () => {
    const cpf = CPF.create("43838424024")

    expect(cpf.isRight()).toBeFalsy()
  })

  test("Repeated digits", () => {
    const cpf = CPF.create("00000000000")

    expect(cpf.isRight()).toBeFalsy()
  })

  test("Repeated with formatation", () => {
    const cpf = CPF.create("111.111.111-11")

    expect(cpf.isRight()).toBeFalsy()
  })
})
