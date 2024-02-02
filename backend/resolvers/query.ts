import { get_all_users, get_user_by_email } from "../clients/users.js";
import { get_all_tasks, get_task_by_user_id } from "../clients/tasks.js";

export const queryResolvers = {
  Query: {
    users: () => get_all_users(),
    tasks: () => get_all_tasks(),
    getAllTasksByUserId: (_, args) => get_task_by_user_id(args.userId),
    getUserByEmail: (_, args) => get_user_by_email(args.email),
  },
};
