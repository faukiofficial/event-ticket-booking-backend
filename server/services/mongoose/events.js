const { NotFoundError, BadRequestError } = require("../../errors");
const { getSingleCategoryService } = require("./categories");
const { getSingleImageService } = require("./images");
const { getSingleTalentService } = require("./talents");
const Event = require("../../api/events/model");

// create event service
exports.createEventService = async (req) => {
  await getSingleImageService(req.body.image);
  await getSingleTalentService(req, req.body.talent);
  await getSingleCategoryService(req, req.body.category);
  
  const isEventExist = await Event.findOne({ title: req.body.title });
  if (isEventExist) {
    throw new BadRequestError("Event already exist");
  }

  const eventData = { ...req.body, organizer: req.user.organizer };

  const event = await Event.create(eventData);

  return event;
};

// get all events service
exports.getEventsService = async (req) => {
  const { keyword, category, talent, status } = req.query;

  let conditions = { organizer: req.user.organizer };
  if (keyword) {
    conditions = { ...conditions, title: { $regex: keyword, $options: "i" } };
  }
  if (category) {
    conditions = { ...conditions, category };
  }
  if (talent) {
    conditions = { ...conditions, talent };
  }

  const events = await Event.find(conditions)
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: {
        path: "image",
        select: "_id url",
      },
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "image",
      select: "_id url",
    });

  if (!events) {
    throw new NotFoundError("Events not found");
  }

  return events;
};

// get single event service
exports.getSingleEventService = async (req) => {
  const { id } = req.params;

  const event = await Event.findOne({ _id: id, organizer: req.user.organizer })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: {
        path: "image",
        select: "_id url",
      },
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "image",
      select: "_id url",
    });

  if (!event) {
    throw new NotFoundError("Event not found");
  }

  return event;
};

// update event service
exports.updateEventService = async (req) => {
  const { id } = req.params;

  const isExist = await Event.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!isExist) {
    throw new NotFoundError("Event not found");
  }

  await getSingleImageService(req.body.image);
  await getSingleTalentService(req.body.talent);
  await getSingleCategoryService(req.body.category);

  const isTitleExist = await Event.findOne({
    _id: { $ne: id },
    organizer: req.user.organizer,
    title: req.body.title,
  });
  if (isTitleExist) {
    throw new BadRequestError("Event already exist");
  }

  const eventData = { ...req.body, organizer: req.user.organizer };

  const event = await Event.findOneAndUpdate({ _id: id }, eventData, {
    new: true,
    runValidators: true,
  });

  return event;
};

// delete event service
exports.deleteEventService = async (req) => {
  const { id } = req.params;

  const event = await Event.findOne({ _id: id, organizer: req.user.organizer });

  if (!event) {
    throw new NotFoundError("Event not found");
  }

  await Event.findOneAndDelete({ _id: id });

  return event;
};

// change status event service
exports.changeStatusEventService = async (req) => {
  const { id } = req.params;
  const { statusEvent } = req.body;

  if (!["Draft", "Published"].includes(statusEvent)) {
    throw new BadRequestError("Invalid status event");
  }

  const event = await Event.findOne({ _id: id, organizer: req.user.organizer });
  if (!event) {
    throw new NotFoundError("Event not found");
  }

  event.statusEvent = statusEvent;

  await event.save();

  return event;
};
