const { StatusCodes } = require("http-status-codes");
const {
  createPaymentService,
  getPaymentsService,
  getSinglePaymentService,
  updatePaymentService,
  deletePaymentService,
} = require("../../services/mongoose/payments");

// create payment controller
exports.createPayment = async (req, res, next) => {
  try {
    const payment = await createPaymentService(req);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

// get all payments controller
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await getPaymentsService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Payments fetched successfully",
      payments,
    });
  } catch (error) {
    next(error);
  }
};

// get single payment controller
exports.getSinglePayment = async (req, res, next) => {
  try {
    const payment = await getSinglePaymentService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment fetched successfully",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

// update payment controller
exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await updatePaymentService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

// delete payment controller
exports.deletePayment = async (req, res, next) => {
  try {
    const deletedPayment = await deletePaymentService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment deleted successfully",
      deletedPayment,
    });
  } catch (error) {
    next(error);
  }
};
