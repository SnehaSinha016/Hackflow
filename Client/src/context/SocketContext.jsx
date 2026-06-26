import {
  createContext,
  useContext,
  useEffect,
} from "react";

import socket from "../socket/socket";

const SocketContext =
  createContext();

export const SocketProvider = ({
  children,
}) => {

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (user?._id)return; 
      if(!socket.connected){
      socket.connect();
      }

      socket.emit(
        "join",
        user._id
      );

    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <SocketContext.Provider
      value={socket}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () =>
  useContext(SocketContext);