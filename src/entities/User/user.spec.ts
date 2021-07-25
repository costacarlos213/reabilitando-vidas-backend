import { User } from "./User"
import { IUser } from "./IUser"

describe("User Domain Entity", () => {
  test("Create Simple User", () => {
    const options: IUser = {
      CPF: "733.879.140-67",
      name: "James Jimmy",
      email: "calorscsot@gmail.com",
      phone: "945508106",
      password: "43661675818"
    }

    const userOrError = User.create(options)

    if (userOrError.isLeft()) {
      console.log(userOrError.value)
      return userOrError.value
    }

    const user: User = userOrError.value

    expect(userOrError.isRight()).toBeTruthy()
    expect(user.Email.value).toEqual(options.email)
    expect(user.Phone.value).toEqual(options.phone)
    expect(user.Name.value).toEqual(options.name)
    expect(user.CPF.value).toEqual(options.CPF)
  })

  test("Create user only with phone number", () => {
    const userOrError = User.create({
      CPF: "733.879.140-67",
      name: "James",
      email: "",
      phone: "945508106",
      password: "carlitos13"
    })

    if (userOrError.isLeft()) return userOrError.value

    const user: User = userOrError.value

    expect(userOrError.isRight()).toBeTruthy()
    expect(user.Email.value).toBeUndefined()
  })

  test("Create user only with Email", () => {
    const userOrError = User.create({
      CPF: "733.879.140-67",
      name: "James",
      email: "calorscsot@gmail.com",
      phone: undefined,
      password: "carlitos13"
    })

    if (userOrError.isLeft()) return userOrError.value

    const user: User = userOrError.value

    expect(userOrError.isRight()).toBeTruthy()
    expect(user.Phone.value).toBeUndefined()
  })

  test("Create user without contact options", () => {
    const user = User.create({
      CPF: "733.879.140-67",
      name: "James Jimmy",
      email: "",
      phone: "",
      password: "carlitos13"
    })

    expect(user.isLeft()).toBeTruthy()
  })
})
