import express from "express"
import { setDB } from "./dbConnection.js"
import helmet from "helmet"
import "dotenv/config"

const app = express()
const db = setDB("bug_tracker")

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.use(helmet())
app.use(express.json())

app.get("/", (req, res) => {
  try {
    return res.json({ success: true, message: "Express API" })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
})

app.get("/users", async (req, res) => {
  try {
    const sql = "SELECT * FROM users"
    // prepared statement
    const { rows, rowCount } = await db.query(sql)
    return res.json({ success: true, rowCount, users: rows })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ success: false })
  }
})

app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body
    const sql =
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING*"
    const values = [username, password]

    // prepared statement
    const inserted = await db.query(sql, values)
    return res.json({
      success: true,
      inserted: { rowCount: inserted.rowCount, rows: inserted.rows },
    })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
})
