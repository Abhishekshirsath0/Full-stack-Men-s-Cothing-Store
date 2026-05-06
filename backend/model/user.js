import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    Firstname: { type: String, required: [true, "First name is required"] },
    Lastname: { type: String, required: [true, "Last name is required"] },
    Address: { type: String, required: [true, "Address is required"] },
    Email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    Phone: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    Usertype: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

// ✅ Prevents OverwriteModelError on hot reload
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
