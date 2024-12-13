const { createImageService, deleteImageService } = require("../../services/mongoose/images");
const { StatusCodes } = require("http-status-codes");

// Create Image Contoller
exports.createImage = async (req, res, next) => {
    try {
        const url = await createImageService(req);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Image created successfully",
            url,
        });
    } catch (error) {
        next(error);
    }
};

// delete Image Controller
exports.deleteImage = async (req, res, next) => {
    try {
        const deleted = await deleteImageService(req);

        console.log(deleted);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Image deleted successfully",
            deleted,
        });
    } catch (error) {
        next(error);
    }
};