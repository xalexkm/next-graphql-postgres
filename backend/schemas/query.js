export const querySchema = `
    type Query {
        users: [User]
        tasks: [Task]
        getAllTasksByUserId(userId: String): [Task]
    }`;
