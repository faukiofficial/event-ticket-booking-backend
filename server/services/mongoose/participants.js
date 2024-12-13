const {
  otpEmailService,
  orderNotificationForParticipant,
} = require("../email/mailing.js");
const Participant = require("../../api/participants/model.js");
const Event = require("../../api/events/model.js");
const Order = require("../../api/orders/model.js");
const Payment = require("../../api/payments/model.js");
const BadRequestError = require("../../errors/bad-request.js");
const { createJWT, attachCookiesToResponse } = require("../../utils/jwt.js");
const NotFoundError = require("../../errors/not-found.js");

// participant register service
exports.registerParticipantService = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  let registered = await Participant.findOne({ email, status: "active" });

  if (registered) {
    throw new BadRequestError("Email already exist");
  }

  let participant = await Participant.findOne({ email, status: "inactive" });

  if (participant) {
    participant.firstName = firstName;
    participant.lastName = lastName;
    participant.email = email;
    participant.password = password;
    participant.role = role;
    participant.otp = Math.floor(1000 + Math.random() * 9000);
    await participant.save();
  } else {
    participant = await Participant.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(1000 + Math.random() * 9000),
    });
  }

  await otpEmailService(email, participant);

  delete participant._doc.password;
  delete participant._doc.otp;

  return participant;
};

// participant verify service
exports.verifyParticipantService = async (req) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new BadRequestError("Please provide email and otp");
  }

  const emailNotExist = await Participant.findOne({ email });
  if (!emailNotExist) {
    throw new BadRequestError("Email not exist");
  }

  const emailExist = await Participant.findOne({ email, status: "active" });
  if (emailExist) {
    throw new BadRequestError("Email already verified");
  }

  const participant = await Participant.findOne({
    email,
    otp,
    status: "inactive",
  });

  if (!participant) {
    throw new BadRequestError("Invalid OTP");
  }

  participant.status = "active";
  participant.otp = null;
  await participant.save();

  delete participant._doc.password;
  delete participant._doc.otp;

  return participant;
};

// participant login service
exports.loginParticipantService = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const notVerified = await Participant.findOne({ email, status: "inactive" });
  if (notVerified) {
    throw new BadRequestError(
      "Email not verified, check your email or reregister"
    );
  }

  const participant = await Participant.findOne({ email, status: "active" });
  if (!participant) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordCorrect = await participant.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid credentials");
  }

  const token = createJWT({
    payload: {
      name: participant.firstName + " " + participant.lastName,
      email,
      userId: participant._id,
      role: participant.role,
    },
  });

  attachCookiesToResponse({
    res,
    token,
  });

  return token;
};

// get all events for participant
exports.getEventsService = async () => {
  const events = await Event.find({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets vanueName");

  return events;
};

// get single event for participant
exports.getSingleEventService = async (req) => {
  const { id } = req.params;

  const event = await Event.findOne({ _id: id, statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: {
        path: "image",
        select: "_id url",
      },
    })
    .populate("organizer");

  if (!event) {
    throw new NotFoundError("Event not found");
  }

  return event;
};

// get all orders for participant
exports.getOrdersService = async (req) => {
  const orders = await Order.find({ participant: req.user.userId });

  return orders;
};

// checkout for participant
exports.checkoutService = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;

  const existEvent = await Event.findOne({
    _id: event,
  });

  if (!existEvent) {
    throw new NotFoundError("Event not found");
  }

  const existPayment = await Payment.findOne({ _id: payment });

  if (!existPayment) {
    throw new NotFoundError("Payment not found");
  }

  let totalPay = 0;
  let totalOrderTicket = 0;

  await tickets.forEach((ticket) => {
    existEvent.tickets.forEach((eventTicket) => {
      if (ticket.ticketCategories.type === eventTicket.type) {
        if (ticket.sumTicket > eventTicket.stock) {
          throw new BadRequestError("Ticket not enough");
        } else {
          eventTicket.stock -= ticket.sumTicket;
          totalOrderTicket += ticket.sumTicket;

          totalPay += ticket.ticketCategories.price * ticket.sumTicket;
        }
      }
    });
  });

  await existEvent.save();

  const historyEvent = {
    title: existEvent.title,
    date: existEvent.date,
    about: existEvent.about,
    tagline: existEvent.tagline,
    keyPoint: existEvent.keyPoint,
    vanueName: existEvent.vanueName,
    tickets: existEvent.tickets.map((ticket) => ({
      type: ticket.type,
      price: ticket.price,
      stock: ticket.stock,
      statusTicketCategories: ticket.statusTicketCategories,
      expiredDate: ticket.expiredDate,
    })),
    image: existEvent.image,
    category: existEvent.category,
    talent: existEvent.talent,
    organizer: existEvent.organizer,
  };

  const data = {
    date: new Date(),
    personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.user.userId,
    payment,
    event,
    historyEvent,
  };

  const order = await Order.create(data);

  await orderNotificationForParticipant(personalDetail.email, data);

  return order;
};
