const { home } = require("../Controllers/genController");
const { Router } = require("express");
const { auth } = require("../Controllers/authController");

const router = Router();

router.use(auth);

router.get("/", home);

module.exports = router;
