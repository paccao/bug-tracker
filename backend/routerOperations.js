import { setDB } from "./dbConnection.js"
const db = setDB("bug_tracker")

/** Home page */
export function root(req, res) {
  try {
    return res.json({ success: true, message: "Express API" })
  } catch (error) {
    return res.status(400).json({ success: false })
  }
}

/** Gets all users currently in the database*/
export async function getAllUsers(req, res) {
  try {
    const sql = "SELECT * FROM users"
    // prepared statement
    const { rows, rowCount } = await db.query(sql)
    return res.json({ success: true, rowCount, users: rows })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ success: false })
  }
}

/** takes a username and password in the request and creates a new user in the database*/
export async function createUser(req, res) {
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
}
