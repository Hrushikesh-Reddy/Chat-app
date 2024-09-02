const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const chatSchema = new Schema({
  username: { type: String, required: true },
  chatData: { type: Object, required: true },
});

const messageSchema = new Schema({
  room_id: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: typeof Date.now(), required: true },
});

const users = mongoose.model("users", userSchema);
const chats = mongoose.model("chats", chatSchema);
const messages = mongoose.model("messages", messageSchema);

module.exports = { users, chats, messages };
