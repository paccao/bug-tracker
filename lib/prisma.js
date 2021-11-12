import { PrismaClient } from "@prisma/client"

/**
 * PrismaClient is attached to the global object in development
 * to prevent exhausting the database connection limit
 * https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
// let prisma: PrismaClient
let prisma

// Prevent exhaustion of connection to db since next creates a new prisma client on each save.
if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient()
} else {
	// Only instatiate PrismaClient on the global object in nodejs when it's not there.
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}
	// Set prisma to the global prisma instance.
	prisma = global.prisma
}

export default prisma
