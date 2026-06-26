import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getNotifications } from "../api/notificationApi";
import { useSocket } from "./SocketContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const socket = useSocket();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    if (!socket) return;

    socket.on("newNotification", (notification) => {

      setNotifications(prev => [
        notification,
        ...prev,
      ]);

    });

    return () => {
      socket.off("newNotification");
    };

  }, [socket]);
  useEffect(() => {
  console.log("Socket:", socket);

  if (!socket) return;

  socket.on("connect", () => {
    console.log("Socket Connected:", socket.id);
  });

  socket.on("newNotification", (notification) => {
    console.log("Notification Received:", notification);

    setNotifications((prev) => [
      notification,
      ...prev,
    ]);
  });

  return () => {
    socket.off("connect");
    socket.off("newNotification");
  };
}, [socket]);

  const unreadCount =
    notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () =>
  useContext(NotificationContext);