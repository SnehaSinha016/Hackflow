import { Bell } from "lucide-react";

import { useNotifications } from "../../context/NotificationContext";

const NotificationBell = () => {

    const { unreadCount } = useNotifications();

    return (

        <div className="relative cursor-pointer">

            <Bell size={24} />

            {unreadCount > 0 && (

                <span
                    className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    rounded-full
                    w-5
                    h-5
                    text-xs
                    flex
                    items-center
                    justify-center
                    "
                >

                    {unreadCount}

                </span>

            )}

        </div>

    );

};

export default NotificationBell;