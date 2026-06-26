import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Required only for email/password users
    password: {
      type: String,
      default: null,
    },

    // Firebase UID (Google/GitHub/Email)
    firebaseUid: {
      type: String,
      default: null,
    },

    // User avatar
    avatar: {
      type: String,
      default: "",
    },

    // Authentication provider
    provider: {
      type: String,
      enum: ["email", "google", "github"],
      default: "email",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent OverwriteModelError
const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;