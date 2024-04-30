import { gql } from "@apollo/client";

const GET_All_TASKS = gql`
  query GetAllTasks {
    tasks {
      estimated_difficulty
      estimated_time
      name
      task_id
      user_id
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String) {
    getUserByEmail(email: $email) {
      email
      password_hash
      password_salt
      user_id
      username
    }
  }
`;

const SEARCH_TASK_BY_NAME = gql`
  query SearchTasksByName($userId: String, $searchString: String) {
    searchTasksByName(userId: $userId, searchString: $searchString) {
      estimated_difficulty
      estimated_time
      name
      task_id
      user_id
    }
  }
`;

const GET_USER = gql`
  query GetAllTasks {
    tasks {
      estimated_difficulty
      estimated_time
      name
      task_id
      user_id
    }
  }
`;

const GET_All_TASKS_BY_USER_ID = gql`
  query GetAllTasksByUserId($userId: String) {
    getAllTasksByUserId(userId: $userId) {
      estimated_difficulty
      estimated_time
      name
      task_id
      user_id
    }
  }
`;

const ADD_TASK = gql`
  mutation CreateTask($input: InputTask) {
    createTask(input: $input) {
      estimated_difficulty
      estimated_time
      name
      task_id
      user_id
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTask) {
    updateTask(input: $input) {
      estimated_difficulty
      estimated_time
      name
      task_id
      user_id
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($userId: String, $taskId: String) {
    deleteTask(userId: $userId, taskId: $taskId)
  }
`;

export {
  DELETE_TASK,
  GET_All_TASKS,
  GET_All_TASKS_BY_USER_ID,
  GET_USER,
  ADD_TASK,
  UPDATE_TASK,
  GET_USER_BY_EMAIL,
  SEARCH_TASK_BY_NAME,
};
