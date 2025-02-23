import userModel from "../../models/User.model.js";
import messageModel from "../../models/message.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userMutations = {
  async register(_, { user }) {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async login(_, { user }) {
    try {
      const { email, password } = user;
      if (!email || !password) {
        throw new Error("Add your email and password");
      }
      const savedUser = await userModel.findOne({ email });
      if (!savedUser) {
        throw new Error("Register first");
      }
      const matched = await bcrypt.compare(password, savedUser.password);
      if (!matched) {
        throw new Error("Password mismatch");
      }
      const token = jwt.sign(
        { _id: savedUser._id, email: savedUser.email },
        process.env.KEY
      );

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteUser(_, { id }, context) {
    console.log("Context received in resolver:", context);
    if (!context || !context._id) {
      throw new Error("Unauthorized");
    }
    if (context._id !== id) {
      throw new Error("You can only delete your own account");
    }
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error("No user found");
      }
      return "User deleted successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUser(_, { id, newFields }, context) {
    if (!context || !context._id) {
      throw new Error("Unauthorized");
    }
    if (context._id !== id) {
        throw new Error("You can only update your own account");
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: newFields },
      { new: true}
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  },
};

export default userMutations;
