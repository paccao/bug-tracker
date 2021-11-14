import prisma from "../../lib/prisma"
import { createUser } from "../../utils/dbOps"

export default async function handler(req, res) {
	try {
		switch (req.method) {
			case "GET":
				const users = await prisma.user.findMany()
				res.status(200).json({ success: true, users })
				break
			case "POST":
				const createdUser = await createUser(req)
				res.status(200).json({
					success: true,
					message: "User created.",
					createdUser,
				})
				break
			default:
				res.status(404).json({
					success: false,
					message: "Api method not set up yet.",
				})
				break
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.message })
	}
}
