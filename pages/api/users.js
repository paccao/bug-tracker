import prisma from "../../lib/prisma"

export default function handler(req, res) {
	console.log(prisma)
	res.status(200).json({ name: "John Doe" })
}
