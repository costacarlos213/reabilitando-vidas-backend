import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase"
import { ICreateUserDTO } from "@useCases/createUser/ICreateUserDTO"
import { Request, Response } from "express"

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handler(req: Request, res: Response): Promise<Response> {
    const userData: ICreateUserDTO = req.body

    try {
      const createUserResponse = await this.createUserUseCase.execute(userData)

      console.log(createUserResponse)

      if (createUserResponse.isLeft()) {
        return res.status(400).json({
          message: createUserResponse.value
        })
      }

      return res.status(201).json({
        message: "User has been created."
      })
    } catch (err) {
      return res.status(500).json({
        message: "The application has encountered an error.",
        error: err
      })
    }
  }
}

export { CreateUserController }
