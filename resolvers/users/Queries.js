import userModel from "../../models/User.model.js";

const userQueries = {
  async users() {
    try {
      const users = await userModel.find({});
      return users;
    } catch (error) {
      throw new Error("Error fetching users");
    }
  },
  async user(_, { id }) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};

export default userQueries;
