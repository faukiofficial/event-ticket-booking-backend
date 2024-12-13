const router = require("express").Router();
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");
const {
  createTalent,
  getTalents,
  getSingleTalent,
  updateTalent,
  deleteTalent,
} = require("./controller");

router.post(
  "/create",
  authenticateUser,
  authorizeRoles("organizer"),
  createTalent
);
router.get(
  "/get-all",
  authenticateUser,
  authorizeRoles("organizer"),
  getTalents
);
router.get(
  "/get/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  getSingleTalent
);
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  updateTalent
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  deleteTalent
);

module.exports = router;
