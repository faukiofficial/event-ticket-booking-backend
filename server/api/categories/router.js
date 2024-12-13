const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");

router.post(
  "/create",
  authenticateUser,
  authorizeRoles("organizer"),
  createCategory
);
router.get(
  "/get-all",
  authenticateUser,
  authorizeRoles("organizer"),
  getCategories
);
router.get(
  "/get/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  getSingleCategory
);
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  updateCategory
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  deleteCategory
);

module.exports = router;
