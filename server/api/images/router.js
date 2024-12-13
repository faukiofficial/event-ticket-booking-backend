const router = require("express").Router();
const multer = require("multer");
const { createImage, deleteImage } = require("./controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/webp" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true);
    } else {
        cb({ message: "Unsupported file format" }, false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 3 },
    fileFilter: fileFilter,
});

router.post("/create", upload.single("image"), createImage)
router.delete("/delete/:id", deleteImage)

module.exports = router