import { io } from "socket.io-client";

const URL = "https://chat-app-c2ux.onrender.com/";

export const socket = io(URL, {
  //transports: ["websocket"],
  autoConnect: false,
});
