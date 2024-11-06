const express = require("express");
const { createServer } = require("node:http");
const { saveMessage } = require("./Model/database");
const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const httpServer = createServer(app);

async function gen(prompt) {
  const result = await model.generateContent(prompt);
  //console.log(result.response.text());
  return result.response.text();
}

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

//let current_room;

io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

io.on("connection", (socket) => {
  socket.on("room-id", async (id) => {
    console.log("id : ", id);
    socket.join(id);
    //current_room = id;
  });

  socket.on("msg", async (room, data) => {
    socket.to(room).emit("from-server", data);
    await saveMessage([data]);
  });

  socket.on("gem-prompt", async (room, data) => {
    let response;
    try {
      //throw new Error("nothin");
      response = await gen(data.message);
    } catch (error) {
      console.error(error);
      response = "An error occured, please try again later...";
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

module.exports = { app, express, httpServer };
