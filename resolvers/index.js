import userMutations from "./users/Mutations.js";
import messageMutations from "./todos/Mutations.js";
import userQueries from "./users/Queries.js";
import messageQueries from "./todos/Queries.js";
import messageModel from "../models/message.model.js";

const resolvers = {
  Query: {
    ...userQueries,
    ...messageQueries,
  },
  Mutation: {
    ...userMutations,
    ...messageMutations,
  },
  User: {
    async messages(parent) {
      return await messageModel.find({ receiverId: parent._id });
    },
  },
};

export default resolvers;
