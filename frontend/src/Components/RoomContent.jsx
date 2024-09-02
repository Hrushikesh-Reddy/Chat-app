/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { socket } from "../scripts/socket";
import api from "../scripts/api";
import Message from "./Message";
import send from "../assets/icons8-send-24.png";
import back from "../assets/exit-left.svg";
import Loading from "./Loading";

// eslint-disable-next-line react/prop-types
export default function RoomContent({
  handleRoom,
  Room_id,
  CURRENT_USER,
  user,
}) {
  const [msg, setMsg] = useState("");
  const [texts, setTexts] = useState([]);
  const [load, setLoad] = useState(false)

  function handleClose() {
    handleRoom();
    socket.disconnect();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (msg.trim() === "") {
      setMsg("");
      return;
    }
    const data = {
      room_id: Room_id,
      sender: CURRENT_USER,
      message: msg,
      timestamp: Date.now(),
    };
    //integrate gem
    if (user === "Gemini") {
      setLoad(true)
      socket.emit("gem-prompt", Room_id, data);
    } else {
      socket.emit("msg", Room_id, data);
    }
    setTexts((texts) => {
      return [...texts, data];
    });
    setMsg("");
  }

  useEffect(() => {
    function onConnect() {
      socket.emit("connection", "yay");
      socket.emit("room-id", Room_id);
      //console.log(Room_id);
      // console.log("Connected");
    }

    function onDisconnect() {
      //console.log("Disconnected");
    }

    function onServerMessage(data) {
      //console.log(data);
      setTexts((texts) => {
        return [...texts, data];
      });
    }

    function onBotResponse(data) {
      //console.log(data);
      setLoad(false);
      setTexts((texts) => {
        return [...texts, data];
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("from-server", onServerMessage);
    socket.on("bot-response", onBotResponse);

    socket.connect();
    api.get("/chat/getmsg", { params: { id: Room_id } }).then((res) => {
      setTexts(res.data);
      //console.log(res.data);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("from-server", onServerMessage);
      socket.off("bot-response", onBotResponse);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bg-slate-400 border-2 border-black w-full h-full flex flex-col cbg">
      <nav className="flex items-center justify-center p-4 border-b-2 border-black bg-blue-400">
        <button onClick={handleClose} className="fixed left-4">
          <img src={back} alt="" height="30px" width="30px" />
        </button>
        <h1 className="text-2xl text-center">{user}</h1>
      </nav>

      <div className="h-[80vh] overflow-y-scroll mb-auto">
        {texts.map((data, index) => {
          //console.log(data.sender, CURRENT_USER, data.user == CURRENT_USER)
          return (
            <Message
              key={data.timestamp}
              message={/* data.sender + " : " +  */ data.message}
              timestamp={data.timestamp}
              isLeft={data.sender !== CURRENT_USER}
              isLast={index + 1 === texts.length}
            />
          );
        })}
        {load && <Loading />}
      </div>

      <form className="bottom-0 p-4 w-full flex justify-center items-center ">
        <div className="w-[80vw] bg-white rounded-3xl pr-4 pl-4 pt-2 pb-2 h-12 border-2 border-blue-500">
          <textarea
            placeholder="Message"
            className="w-full focus:outline-none resize-none h-8"
            type="textbox"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
        </div>

        <button
          className="ml-2 border-2 border-blue-500 rounded-[50%] focus:outline-none h-10 w-10 flex justify-center items-center bg-white"
          onClick={handleSubmit}
        >
          <img src={send} alt="" height="24px" width="24px" />
        </button>
      </form>
    </div>
  );
}
