const { Router } = require("express");
const { auth } = require("../Controllers/authController");
const { chatInit, pastChats, pastMessages, checkUser } = require("../Controllers/chatController");

const router = Router();
router.use(auth);

router.post("/add", chatInit);
router.get("/get", pastChats);
router.get("/getmsg", pastMessages);
router.get("/checkuser", checkUser);

module.exports = router;
