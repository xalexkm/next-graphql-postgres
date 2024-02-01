import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  mutationSchema,
  querySchema,
  taskSchema,
  userSchema,
} from "./schemas/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { queryResolvers } from "./resolvers/index.js";
import merge from "lodash/merge.js";
import { mutationResolvers } from "./resolvers/mutation.js";

const schema = makeExecutableSchema({
  typeDefs: [userSchema, querySchema, taskSchema, mutationSchema],
  resolvers: merge([queryResolvers, mutationResolvers]),
});

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
