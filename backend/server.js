import express from "express"
import helmet from "helmet"
import "dotenv/config"

import * as ops from "./routerOperations"

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Middlewares
app.use(helmet())
app.use(express.json())

// Routes
app.get("/", (req, res) => {
  ops.root(req, res) // This is a test only
})

app.get("/users", (req, res) => {
  ops.getAllUsers(req, res)
})

app.post("/users", (req, res) => {
  ops.postUsers(req, res)
})
