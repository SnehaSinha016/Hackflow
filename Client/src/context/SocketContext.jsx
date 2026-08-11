import {
    createContext,
    useContext,
    useEffect,
} from "react";

import socket from "../socket/socket";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user?._id) return;

        const handleConnect = () => {
            console.log("Socket connected:", socket.id);

            socket.emit("join", user._id);

            console.log(
                "Joined user room:",
                user._id
            );
        };

        if (!socket.connected) {
            socket.connect();
        }

        socket.on("connect", handleConnect);

        // In case socket was already connected
        if (socket.connected) {
            handleConnect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () =>
    useContext(SocketContext);