export const mutationSchema = `
    input InputTask {
        name: String
        estimated_time: Int
        estimated_difficulty: Int
        user_id: String!
    }
    
    input UpdateTask {
        name: String
        estimated_time: Int
        estimated_difficulty: Int
        user_id: String
        task_id: String!
    }
    
    type Mutation {
      createTask(input: InputTask): Task
      deleteTask(userId: String, taskId: String): String
      updateTask(input: UpdateTask): Task
    }
    `;
