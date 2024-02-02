import {
  delete_task,
  insert_task,
  update_task,
  update_task_estimated_difficulty,
  update_task_estimated_time,
  update_task_name,
} from "../clients/tasks.js";

export const mutationResolvers = {
  Mutation: {
    createTask: async (_, args) => {
      await insert_task(args.input);
      return args.input;
    },
    deleteTask: async (_, args) => {
      await delete_task(args.userId, args.taskId);
      return args.taskId;
    },
    updateTask: async (_, args) => {
      args = args.input;
      await update_task(
        args.user_id,
        args.task_id,
        args.name,
        args.estimated_difficulty,
        args.estimated_time,
      );
      return args;
    },
  },
};
