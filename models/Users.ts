import { userTypes } from "@/lib/constants";
import { Model, Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    userType: {
      type: String,
      enum: userTypes,
      default: "admin",
    },
  },
  { strict: false, timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let User: Model<any>;
try {
  User = models.User || model("User", UserSchema, "User");
} catch (error) {
  User = model("User", UserSchema, "User");
  console.error("Error", error);
}

export default User;
