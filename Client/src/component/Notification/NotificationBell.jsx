import { useState } from "react";
import { Bell } from "lucide-react";

import { useNotifications } from "../../context/NotificationContext";
import {
    markAsRead,
    markAllAsRead,
} from "../../api/notificationApi";

const NotificationBell = () => {
    const {
        notifications,
        unreadCount,
        setNotifications,
    } = useNotifications();

    const [open, setOpen] = useState(false);

    const handleNotificationClick = async (notification) => {
        if (notification.isRead) return;

        try {
            await markAsRead(notification._id);

            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === notification._id
                        ? { ...n, isRead: true }
                        : n
                )
            );
        } catch (error) {
            console.log("Failed to mark notification as read", error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllAsRead();

            setNotifications((prev) =>
                prev.map((n) => ({
                    ...n,
                    isRead: true,
                }))
            );
        } catch (error) {
            console.log("Failed to mark all as read", error);
        }
    };

    return (
        <div className="relative">

            {/* Bell */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100"
            >
                <Bell size={24} />

                {unreadCount > 0 && (
                    <span
                        className="
                        absolute
                        -top-1
                        -right-1
                        bg-red-500
                        text-white
                        rounded-full
                        min-w-5
                        h-5
                        px-1
                        text-xs
                        flex
                        items-center
                        justify-center
                        "
                    >
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Notification dropdown */}
            {open && (
                <div
                    className="
                    absolute
                    right-0
                    top-12
                    w-80
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    shadow-xl
                    z-50
                    overflow-hidden
                    "
                >

                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-semibold">
                            Notifications
                        </h3>

                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-sm text-violet-600 hover:underline"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* Notifications */}
                    <div className="max-h-96 overflow-y-auto">

                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                No notifications
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    onClick={() =>
                                        handleNotificationClick(notification)
                                    }
                                    className={`
                                        p-4
                                        border-b
                                        cursor-pointer
                                        hover:bg-gray-50
                                        ${
                                            !notification.isRead
                                                ? "bg-violet-50"
                                                : ""
                                        }
                                    `}
                                >
                                    <p className="text-sm font-medium">
                                        {notification.title ||
                                            "Notification"}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {notification.message}
                                    </p>

                                    {!notification.isRead && (
                                        <span className="text-xs text-violet-600">
                                            Unread
                                        </span>
                                    )}
                                </div>
                            ))
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;