const { v4: uuidv4 } = require("uuid");
const { createChat, getChats, getMessage, getUser } = require("../Model/database");

const chatInit = async (req, res) => {
  //console.log(req.body);
  let chatid = uuidv4();
  let ob1 = {
    username: req.body.from,
    chatData: { to: req.body.to, id: chatid },
  };
  let ob2 = {
    username: req.body.to,
    chatData: { to: req.body.from, id: chatid },
  };

  await createChat([ob1, ob2]);
  res.end()
};

const pastChats = async (req, res) => {
  try {
    const user = req.query.reqdata.username;
    console.log("Body : ", req.query);
    const dbdata = await getChats(user);
    const refined = dbdata.map((data) => {
      return { user: data.chatData.to, id: data.chatData.id };
    });
    //console.log(refined);
    res.end(JSON.stringify(refined));
  } catch (e) {
    console.error(e);
    res.end(JSON.stringify([{fail:"fail"}]));
  }
};

const pastMessages = async (req, res) => {
  try {
    const id = req.query.id;
    //console.log("contr : ", id)
    const data = await getMessage(id);
    //console.log(data)
    res.end(JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
};

const checkUser = async(req, res) => {
  try {
    let user = req.query.user;
    const data = await getUser(user);
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    res.end(JSON.stringify({}))
  }
}

module.exports = { chatInit, pastChats, pastMessages, checkUser };
