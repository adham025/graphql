import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      unique: true,
      minLength: 3,
      maxLength: 15,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { collection: "messages", timestamps: true }
);

const messageModel = model("message", messageSchema);

export default messageModel;
