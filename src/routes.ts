import { Router } from "express"
import { CPF } from "./entities/User/CPF"

const router = Router()

router.get("/", async (req, res) => {
  const cpf = CPF.create("436.616.758-18")

  res.json({
    formatedNumber: cpf
  })
})

export { router }
