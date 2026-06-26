import api from "./axios";

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data.notifications;
};

export const markAsRead = async (id) => {
  await api.patch(`/notifications/${id}/read`);
};

export const markAllAsRead = async () => {
  await api.patch("/notifications/read-all");
};