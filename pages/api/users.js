import prisma from "../../lib/prisma"

export default async function handler(req, res) {
	try {
		console.log(req.method)
		switch (req.method) {
			case "GET":
				const users = await prisma.user.findMany()
				res.status(200).json({ success: true, users })
				break
			case "POST":
				const createdUser = await prisma.user.create(req.body)
				res.status(200).json({
					success: true,
					message: "User created.",
					createdUser,
				})
				break
			default:
				res.status(200).json({
					success: false,
					message: "Api method not set up yet.",
				})
				break
		}
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
