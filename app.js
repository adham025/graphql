import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema2.js";
import resolvers from "./resolvers/index.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect("mongodb://127.0.0.1:27017/saraha")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: (err) => {
    return { message: err.message };
  },
});

const port = 3000;
startStandaloneServer(server, {
  listen: { port },
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (!authorization) {
      console.log("No authorization header");
      return {};
    }else {
      try {
        const decoded = jwt.verify(authorization, process.env.KEY);
        console.log("Decoded Token:", decoded);
        return decoded;
      } catch (err) {
        throw new Error("Invalid token");
      }
    }
  },
})
  .then(() => {
    console.log(`Server listening on port ${port}`);
  })
  .catch((err) => console.error(err));
