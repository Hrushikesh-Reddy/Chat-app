const mongoose = require("mongoose");
const { users, chats, messages } = require("./model");
require("dotenv").config();

const URL = process.env.MONGO_URL;

async function saveUser(obj) {
  try {
    await mongoose.connect(URL);
    //console.log(users);
    await users.insertMany([obj]);
  } catch (e) {
    console.error(e);
  } /* finally {
    await mongoose.disconnect();
  } */
}

async function saveMessage(obj) {
  try {
    await mongoose.connect(URL);
    await messages.insertMany(obj);
  } catch (e) {
    console.error(e);
  } /* finally {
    await mongoose.disconnect();
  } */
}

async function getMessage(room_id) {
  try {
    await mongoose.connect(URL);
    let data = await messages.find({ room_id: room_id });
    return data;
  } catch (e) {
    console.error(e);
    return [{fail:fail}];
  } /* finally {
    await mongoose.disconnect();
  } */
}

async function createChat(data) {
  try {
    await mongoose.connect(URL);
    let res = await chats.insertMany(data);
    //console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }/*  finally {
    await mongoose.disconnect();
  } */
}

async function getChats(username) {
  try {
    await mongoose.connect(URL);
    //console.log(username);
    let data = await chats.find({ username: username });
    return data;
  } catch (e) {
    console.error(e);
    return [{}];
  } /* finally {
    await mongoose.disconnect();
  } */
}

async function getUser(username) {
  try {
    await mongoose.connect(URL);
    //console.log(username);
    let data = await users.findOne({ username: username });
    return data;
  } catch (e) {
    console.error(e);
    return {};
  } /* finally {
    await mongoose.disconnect();
  } */
}

module.exports = {
  saveUser,
  getUser,
  createChat,
  getChats,
  saveMessage,
  getMessage,
};
