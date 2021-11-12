import { gql } from "apollo-server-micro"

export const typeDefs = gql`
	type User {
		id: Number!
		user_name: String!
		password: String!
		email: String!
		avatar: String!
		created_at: String!
		updated_at: String!
		boards: [Board!]!
		assigned_at: [String!]!
	}

	type Board {

  }

	type Query {
		users: [User]!
	}
	# type Mutation{

	# }
`
