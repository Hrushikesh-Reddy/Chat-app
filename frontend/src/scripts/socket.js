import { io } from "socket.io-client";

const URL =
"/choreo-apis/chatapp/backend/v1"

export const socket = io(undefined, {
  //transports: ["websocket"],
  autoConnect: false,
});
