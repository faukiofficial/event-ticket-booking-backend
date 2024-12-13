const router = require("express").Router();
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");
const { createOrganizer, createUser, getUsers } = require("./controller");

router.post("/create-organizer",  authenticateUser, authorizeRoles("owner"), createOrganizer);
router.post("/create-admin", authenticateUser, authorizeRoles("organizer"), createUser);
router.get("/get-users", authenticateUser, authorizeRoles("owner"), getUsers);

module.exports = router;
