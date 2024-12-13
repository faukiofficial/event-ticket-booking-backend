const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");
const { getOrders } = require("./controller");

const router = require("express").Router();

router.get("/get-all", authenticateUser, authorizeRoles("organizer", "admin", "owner"), getOrders);

module.exports = router;