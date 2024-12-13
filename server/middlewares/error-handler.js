const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
    let customError = {
        // set default
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || "Something went wrong, try again later",
    };
    
    if (error.name === "ValidationError") {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = Object.values(error.errors)
            .map((item) => item.message)
            .join(",");
    }

    if (error.code && error.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = `Duplicate value entered for ${Object.keys(
            error.keyValue
        )} field, please choose another value`;
    }

    if (error.name === "CastError") {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = `No item found with id: ${error.value}`;
    }
    
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;