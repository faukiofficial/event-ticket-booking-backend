const router = require("express").Router();
const { authenticateUser } = require("../../middlewares/auth");
const { registerParticipant, verifyParticipant, loginParticipant, getEvents, getSingleEvent, getOrders, checkout } = require("./controller");

router.post("/register", registerParticipant);
router.post("/verify", verifyParticipant);
router.post("/login", loginParticipant);
router.get("/events", getEvents);
router.get("/event/:id", getSingleEvent);
router.get("/orders", authenticateUser, getOrders);
router.post("/checkout", authenticateUser, checkout);

module.exports = router;