import { get_all_users } from "../clients/users.js";

export const queryResolvers = {
  Query: {
    users: () => get_all_users(),
  },
};
