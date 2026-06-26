import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    message: String,

    type: {
      type: String,
      enum: [
        "project",
        "task",
        "milestone",
        "ai",
        "system"
      ],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    data:{
      projectId:String,
      taskId:String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);