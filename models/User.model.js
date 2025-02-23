import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
  next();
});

const userModel = model("user", userSchema);
export default userModel;
