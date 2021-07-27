import { app } from "./app"

app.listen(process.env.SERVER_PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
)
