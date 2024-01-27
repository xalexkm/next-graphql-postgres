import { get_all_users } from "../clients/users.js";

export const usersResolvers = {
  User: {
    users: () => get_all_users(),
  },
};
