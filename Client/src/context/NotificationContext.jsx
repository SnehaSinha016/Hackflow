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

    const loadNotifications = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token yet");
            return;
        }

        try {
            const data = await getNotifications();
            setNotifications(data || []);
        } catch (error) {
            console.log("Notification error:", error);
        }
    };

    useEffect(() => {
        // In case user is already logged in
        loadNotifications();

        // For login happening after app has mounted
        const handleTokenReady = () => {
            console.log("Token ready → loading notifications");
            loadNotifications();
        };

        window.addEventListener(
            "authTokenReady",
            handleTokenReady
        );

        return () => {
            window.removeEventListener(
                "authTokenReady",
                handleTokenReady
            );
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleNotification = (notification) => {
            setNotifications((prev) => [
                notification,
                ...prev,
            ]);
        };

        socket.on(
            "newNotification",
            handleNotification
        );

        return () => {
            socket.off(
                "newNotification",
                handleNotification
            );
        };
    }, [socket]);

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                setNotifications,
                loadNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () =>
    useContext(NotificationContext);