const Order = require("../../api/orders/model.js");

// get all orders service
exports.getOrdersService = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let conditions = {};

  if (req.user.role !== "owner") {
    conditions = { ...conditions, "historyEvent.talent": req.user._id };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    conditions = { ...conditions, date: { $gte: start, $lte: end } };
  }

  const orders = await Order.find(conditions)
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Order.countDocuments(conditions);

  return { data: orders, pages: Math.ceil(count / limit), total: count };
};
