import { io } from "socket.io-client";

const URL =
  "https://d375fde1-518f-48b0-a740-d2e359b482eb.e1-us-east-azure.choreoapps.dev/chatapp/backend/v1/choreo-apis/chatapp/backend/v1";

export const socket = io(URL, {
  //transports: ["websocket"],
  autoConnect: false,
});
