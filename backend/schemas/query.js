export const querySchema = `
    type Query {
        users: [User]
        tasks: [Task]
        getAllTasksByUserId(userId: String): [Task]
        getUserByEmail(email: String): [User]
        searchTasksByName(userId: String, searchString: String): [Task]
    }`;
