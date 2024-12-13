const router = require("express").Router();
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");
const {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  changeStatusEvent,
} = require("./controller");

router.post(
  "/create",
  authenticateUser,
  authorizeRoles("organizer"),
  createEvent
);
router.get(
  "/get-all",
  authenticateUser,
  authorizeRoles("organizer"),
  getEvents
);
router.get(
  "/get/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  getSingleEvent
);
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  updateEvent
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  deleteEvent
);
router.put(
  "/update-status/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  changeStatusEvent
);

module.exports = router;
