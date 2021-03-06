import { Name } from "./Name"

describe("Name validator", () => {
  test("Name with less then 2 chars", () => {
    const nameOrError = Name.create("a")

    expect(nameOrError.isLeft()).toBeTruthy()
  })

  test("Too long name", () => {
    let sum = ""

    for (let i = 0; i < 256; i++) {
      sum += "a"
    }

    const nameOrError = Name.create(sum)

    expect(nameOrError.isLeft()).toBeTruthy()
  })
})
