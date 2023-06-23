import { io, Socket } from "socket.io-client";
import { useState, useEffect } from "react";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let socket: Socket;

    const getSocket = async () => {
      await fetch("/api/socket");
      socket = io("", {
        path: "/api/socket_io",
      });
      setSocket(socket);
    };

    getSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return socket;
}
