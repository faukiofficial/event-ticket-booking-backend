const { StatusCodes } = require("http-status-codes");
const { createOrganizerService, createUserService, getUsersService } = require("../../services/mongoose/users");

// create organizer controller
exports.createOrganizer = async (req, res, next) => {
    try {
        const user = await createOrganizerService(req);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Organizer created successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

// create user controller
exports.createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

// get all users controller
exports.getUsers = async (req, res, next) => {
    try {
        const users = await getUsersService(req);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        next(error);
    }
};