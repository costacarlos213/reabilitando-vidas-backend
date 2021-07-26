import { Router } from "express"
import { createUserController } from "./main/createUser"

const router = Router()

router.post("/user", async (req, res) => {
  return (await createUserController).handler(req, res)
})

export { router }
