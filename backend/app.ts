import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { querySchema, userSchema } from "./schemas/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { usersResolvers, queryResolvers } from "./resolvers/index.js";
import merge from "lodash/merge.js";

const schema = makeExecutableSchema({
  typeDefs: [userSchema, querySchema],
  resolvers: merge([queryResolvers]),
});

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
