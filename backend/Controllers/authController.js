const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { saveUser, getUser, createChat } = require("../Model/database");

const register = async (req, res) => {
  //console.log(req.body)
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  let user = req.body.username;
  let password = req.body.password;
  try {
    bcrypt.hash(password, 10, async (err, hsh) => {
      if (err) {
        console.log(err);
      } else {
        await saveUser({ username: user, password: hsh });
        let chatid = uuidv4();
        let ob1 = {
          username: user,
          chatData: { to: "Gemini", id: chatid },
        };
        let ob2 = {
          username: "Gemini",
          chatData: { to: user, id: chatid },
        };
        await createChat([ob1, ob2]);
      }
    });
  } catch (e) {
    console.error(e);
  }
  res.end();
};

const login = async (req, res) => {
  const user = await getUser(req.body.username);
  console.log(req.body, user);
  try {
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ user: user.username }, process.env.ACCESS_TOKEN);
      res.status(200).json({ access: token, refresh: "temp" });
    } else {
      res.status(401).send("Failure");
    }
  } catch (e) {
    console.error(e);
  }
};

function auth(req, res, nxt) {
  const authHeader = req.headers["auth"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
    if (err) return res.sendStatus(403);
    req.user = data;
    nxt();
  });
}

module.exports = {
  register,
  login,
  auth,
};
