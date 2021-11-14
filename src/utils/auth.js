import { hash } from "bcrypt"

export async function hashPass(pass) {
	const hashedPass = await hash(pass, Number(process.env.SALT_ROUNDS))
	console.log(hashedPass)
	return hashedPass
}
