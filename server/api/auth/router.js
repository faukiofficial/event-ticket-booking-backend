const router = require("express").Router();
const { login, logout } = require("./controller");

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;