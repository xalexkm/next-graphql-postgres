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
      await delete_task(args.taskId);
      return args.taskId;
    },
    updateTask: async (_, args) => {
      args = args.input;
      if (args.name && args.estimated_difficulty && args.estimated_time) {
        await update_task(
          args.task_id,
          args.name,
          args.estimated_difficulty,
          args.estimated_time,
        );
      } else {
        if (args.name) await update_task_name(args.task_id, args.name);
        if (args.estimated_time)
          await update_task_estimated_time(args.task_id, args.estimated_time);
        if (args.estimated_difficulty)
          await update_task_estimated_difficulty(
            args.task_id,
            args.estimated_difficulty,
          );
      }
      return args;
    },
  },
};
