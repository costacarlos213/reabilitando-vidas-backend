import { User } from "./User"
import { IUser } from "./IUser"

describe("User Domain Entity", () => {
  test("Create Simple User", () => {
    const options: IUser = {
      cpf: "733.879.140-67",
      name: "James Jimmy",
      email: "calorscsot@gmail.com",
      phone: "945508106"
    }

    const user: User = User.create(options)

    expect(user).toBeInstanceOf(User)
    expect(user.Email.value).toEqual(options.email)
    expect(user.Phone.value).toEqual(options.phone)
    expect(user.Name.value).toEqual(options.name)
    expect(user.cpf.value).toEqual(options.cpf)
  })

  test("Create user only with phone number", () => {
    const user = User.create({
      cpf: "733.879.140-67",
      name: "James",
      email: undefined,
      phone: "945508106",
      password: "carlitos13"
    })

    expect(user).toBeInstanceOf(User)
    expect(user.Email.value).toBeUndefined()
  })

  test("Create user only with Email", () => {
    const user = User.create({
      cpf: "733.879.140-67",
      name: "James",
      email: "calorscsot@gmail.com",
      phone: undefined,
      password: "carlitos13"
    })

    expect(user).toBeInstanceOf(User)
    expect(user.Phone.value).toBeUndefined()
  })

  test("Create user without contact options", () => {
    expect(() => {
      User.create({
        cpf: "733.879.140-67",
        name: "James Jimmy",
        email: undefined,
        phone: undefined,
        password: "carlitos13"
      })
    }).toThrow()
  })
})
