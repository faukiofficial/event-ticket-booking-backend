const router = require("express").Router();
const { authenticateUser, authorizeRoles } = require("../../middlewares/auth");
const { createPayment, getPayments, getSinglePayment, updatePayment, deletePayment } = require("./controller");

router.post(
    "/create",
    authenticateUser,
    authorizeRoles("organizer"),
    createPayment
);

router.get(
    "/get-all",
    authenticateUser,
    authorizeRoles("organizer"),
    getPayments
);

router.get(
    "/get/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    getSinglePayment
);

router.put(
    "/update/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    updatePayment
);

router.delete(
    "/delete/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    deletePayment
);

module.exports = router;