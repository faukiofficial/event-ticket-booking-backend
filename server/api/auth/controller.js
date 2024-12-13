const { StatusCodes } = require("http-status-codes");
const { loginUserService, logoutUserService } = require("../../services/mongoose/auth");

// login
exports.login = async (req, res, next) => {
    try {
        const token = await loginUserService(req, res);
        res.status(StatusCodes.OK).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

// logout
exports.logout = async (req, res, next) => {
    try {
        logoutUserService(req, res);
    } catch (error) {
        next(error);
    }
};