import { gql } from "@apollo/client";
import client from "@/src/app/client";

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
  mutation DeleteTask($taskId: String) {
    deleteTask(taskId: $taskId)
  }
`;

export async function POST(request: Request) {
  const res = await request.json();
  const userId = res.user_id;
  // Here should be user_id validation
  const data = await client.query({
    query: GET_All_TASKS_BY_USER_ID,
    variables: { userId },
    fetchPolicy: "no-cache",
  });
  return Response.json(data.data.getAllTasksByUserId);
}

export async function PUT(request: Request) {
  const res = await request.json();
  // Here should be user_id validation
  const data = await client.mutate({
    mutation: ADD_TASK,
    variables: {
      input: res,
    },
  });
  return Response.json(data.data.createTask);
}

export async function PATCH(request: Request) {
  const res = await request.json();
  // Here should be user_id validation
  const data = await client.mutate({
    mutation: UPDATE_TASK,
    variables: {
      input: res,
    },
  });
  return Response.json(data.data.updateTask);
}

export async function DELETE(request: Request) {
  const res = await request.json();
  // Here should be user_id validation
  const data = await client.mutate({
    mutation: DELETE_TASK,
    variables: {
      taskId: res.task_id,
    },
  });
  return Response.json(data.data.deleteTask);
}
