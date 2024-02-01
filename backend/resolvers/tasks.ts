import { get_all_tasks } from "../clients/tasks.js";

export const tasksResolvers = {
  Task: {
    tasks: () => get_all_tasks(),
  },
};
