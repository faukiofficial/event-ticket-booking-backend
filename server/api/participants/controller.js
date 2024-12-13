const { StatusCodes } = require("http-status-codes");
const {
  registerParticipantService,
  verifyParticipantService,
  loginParticipantService,
  getEventsService,
  getSingleEventService,
  getOrdersService,
  checkoutService,
} = require("../../services/mongoose/participants");

// participant register controller
exports.registerParticipant = async (req, res, next) => {
  try {
    const participant = await registerParticipantService(req);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Participant registered and need to verify",
      participant,
    });
  } catch (error) {
    next(error);
  }
};

// verify participant controller
exports.verifyParticipant = async (req, res, next) => {
  try {
    const participant = await verifyParticipantService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Participant verified successfully",
      participant,
    });
  } catch (error) {
    next(error);
  }
};

// login participant controller
exports.loginParticipant = async (req, res, next) => {
  try {
    const token = await loginParticipantService(req, res);
    res.status(StatusCodes.OK).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// get all events for participant controller
exports.getEvents = async (req, res, next) => {
  try {
    const events = await getEventsService();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    next(error);
  }
};

// get single event for participant controller
exports.getSingleEvent = async (req, res, next) => {
  try {
    const event = await getSingleEventService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Event fetched successfully",
      event,
    });
  } catch (error) {
    next(error);
  }
};

// get all orders for participant controller
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

// checkout for participant controller
exports.checkout = async (req, res, next) => {
  try {
    const order = await checkoutService(req);
    res.status(StatusCodes.CREATED).json({ success: true, message: "Order placed", order });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
