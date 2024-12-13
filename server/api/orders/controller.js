const { StatusCodes } = require("http-status-codes");
const { getOrdersService } = require("../../services/mongoose/orders");

// get all orders
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await getOrdersService(req);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        next(error);
    }
};