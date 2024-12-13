const { getSingleImageService } = require("./images");
const Payment = require("../../api/payments/model");
const { NotFoundError, BadRequestError } = require("../../errors");

// create payment service
exports.createPaymentService = async (req) => {
  const { type, image } = req.body;

  await getSingleImageService(image);

  const existPayment = await Payment.findOne({
    type,
    organizer: req.user.organizer,
  });

  if (existPayment) {
    throw new BadRequestError("Payment already exist");
  }

  const payment = await Payment.create({
    type,
    image,
    organizer: req.user.organizer,
  });

  return payment;
};

// get all payments service
exports.getPaymentsService = async (req) => {
  const payments = await Payment.find({ organizer: req.user.organizer })
    .populate("image")
    .select("_id type image status");

  return payments;
};

// get single payment service
exports.getSinglePaymentService = async (req) => {
  const { id } = req.params;

  const payment = await Payment.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate("image")
    .select("_id type image status");

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  return payment;
};

// update payment service
exports.updatePaymentService = async (req) => {
  const { id } = req.params;
  const { type, image, status } = req.body;

  await getSingleImageService(image);

  const existPayment = await Payment.findOne({
    _id: { $ne: id },
    organizer: req.user.organizer,
    type,
  });
  if (existPayment) {
    throw new BadRequestError("Payment already exist");
  }

  const payment = await Payment.findOneAndUpdate(
    { _id: id, organizer: req.user.organizer },
    { type, image, status },
    { new: true, runValidators: true }
  );

  if (!payment) {
    throw new NotFoundError("Payment method not found");
  }

  return payment;
};

// delete payment service
exports.deletePaymentService = async (req) => {
  const { id } = req.params;

  const payment = await Payment.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  await Payment.findOneAndDelete({ _id: id });

  return payment;
};

// check payment service
exports.checkPaymentService = async (id) => {
  const payment = await Payment.findOne({ _id: id });

  if (!payment) {
    throw new NotFoundError("Payment Not Found");
  }

  return payment;
};
