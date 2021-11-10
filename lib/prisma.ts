import { PrismaClient } from "@prisma/client"

/**
 * PrismaClient is attached to the global object in development
 * to prevent exhausting the database connection limit
 * https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
// Initialize prisma on the global object
let prisma: PrismaClient

// Create instance of prisma in the production
// to prevent exhaustion of connection to db
if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient()
} else {
	// Only instatiate PrismaClient when it's not on the global object
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}
	// Otherwise set prisma to the preexisting one
	prisma = global.prisma
}

export default prisma
