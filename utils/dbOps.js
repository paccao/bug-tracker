import Joi from "joi"
import prisma from "../lib/prisma"
import { hashPass } from "../utils/auth"

const userSchema = Joi.object({
	user_name: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	repeat_password: Joi.ref("password"),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
}).with("password", "repeat_password")

export async function createUser(req) {
	try {
		const validatedUser = await userSchema.validateAsync(req.body)
		console.log(validatedUser)
		const hashedPass = await hashPass(validatedUser.password)
		const createdUser = await prisma.user.create({
			data: {
				...validatedUser,
				password: hashedPass,
			},
		})
		console.log("created USER", createdUser)
		return createdUser
	} catch (error) {
		return error
	}
}
