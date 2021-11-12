export const resolvers = {
	Query: {
		users: () => [
			{
				id: 1,
				user_name: "paccao",
				password: "pwd123",
				email: "bluepaccao@gmail.com",
				avatar: "https://loremflickr.com/512/512",
				created_at: "now()",
				updated_at: "now()",
				boards: [],
				assigned_at: [],
			},
		],
	},
}
