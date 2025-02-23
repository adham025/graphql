import messageModel from "../../models/message.model.js";

const messageMutations = {
  async add(_, { text }, context) {
    if (!context || !context._id) {
      throw new Error("Unauthorized");
    }
    try {
      const newMessage = new messageModel({
        text,
        receiverId: context._id,
      });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteMessage(_, { id }, context) {
    if (!context || !context._id) {
      throw new Error("Unauthorized");
    }
    try {
      const message = await messageModel.findById(id);
      if (!message) {
        throw new Error("Message not found");
      }
      if (message.receiverId !== context._id) {
        throw new Error("You can only delete your own messages");
      }
      await messageModel.findByIdAndDelete(id);
      return "Message deleted successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default messageMutations;
