import prisma from "../../lib/prisma"
import { hashPass } from "../../utils/auth"
import { createUser } from "../../utils/dbOps"

export default async function handler(req, res) {
	try {
		console.log(req.method)
		switch (req.method) {
			case "GET":
				const users = await prisma.user.findMany()
				res.status(200).json({ success: true, users })
				break
			case "POST":
				const createdUser = createUser()
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
