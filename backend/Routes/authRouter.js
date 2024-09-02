const { register, login } = require("../Controllers/authController");
const { Router } = require("express");

const router = Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
