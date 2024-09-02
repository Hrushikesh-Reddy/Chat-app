const express = require("express");
const morgan = require("morgan");
//const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { saveMessage } = require("./Model/database");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);

const authRouter = require("./Routes/authRouter");
const genRouter = require("./Routes/genRouter");
const chatRouter = require("./Routes/chatRouter");

app.use(express.json());
app.use(morgan("dev"));
//app.use(cors());

app.use("/api", authRouter);
app.use("/chat", chatRouter);
app.use(genRouter);

async function gen(prompt) {
  const result = await model.generateContent(prompt);
  //console.log(result.response.text());
  return result.response.text();
}

const io = new Server(httpServer, {
/*   cors: {
    origin: ["https://d375fde1-518f-48b0-a740-d2e359b482eb.e1-us-east-azure.choreoapps.dev/"],
  }, */
  connectionStateRecovery: {},
});

//let current_room;

io.on("connection", (socket) => {
  socket.on("room-id", async (id) => {
    // console.log("id : ", id)
    socket.join(id);
    //current_room = id;
  });

  socket.on("msg", async (room, data) => {
    socket.to(room).emit("from-server", data);
    await saveMessage([data]);
  });

  socket.on("gem-prompt", async (room, data) => {
    let response;
    try{
      //throw new Error("nothin");
      response = await gen(data.message);}
    catch(error){
      console.error(error);
      response = "An error occured, please try again later..."
    }
    //let response = "sample";
    const gemdata = {
      room_id: room,
      sender: "Gemini",
      message: response,
      timestamp: Date.now(),
    };
    io.to(room).emit("bot-response", gemdata, (err) => {
      //console.error(err);
    });
    console.log(room);
    //console.log(current_room, gemdata, data);
    await saveMessage([data, gemdata]);
  });
});

httpServer.listen(PORT, console.log(`listening on port ${PORT}...`));
