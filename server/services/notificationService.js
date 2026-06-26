import Notification from "../models/Notification.js";
import { getIO } from "../socket/socket.js";

export const sendNotification = async ({
  user,
  title,
  message,
  type,
  data = {},
}) => {
  const notification = await Notification.create({
    user,
    title,
    message,
    type,
    data,
  });

  const io = getIO();

  io.to(user.toString()).emit("newNotification", notification);

  return notification;
};