import { worker } from "@providers/mail/implementation/worker/mailWorker"
import { app } from "./app"

worker.on("failed", (job, err) =>
  console.log(`Failed job ${job.id} with ${err}`)
)

app.listen(process.env.SERVER_PORT || 3000, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
)
