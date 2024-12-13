const { StatusCodes } = require("http-status-codes");
const { createEventService, getEventsService, getSingleEventService, updateEventService, deleteEventService, changeStatusEventService } = require("../../services/mongoose/events");

// create event controller
exports.createEvent = async (req, res, next) => {
    try {
        const event = await createEventService(req);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Event created successfully",
            event,
        });
    } catch (error) {
        console.log(error);
        next(error);    
    }
};

// get all events
exports.getEvents = async (req, res, next) => {
    try {
        const events = await getEventsService(req);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Events fetched successfully",
            events,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// get single event
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

// update event
exports.updateEvent = async (req, res, next) => {
    try {
        const event = await updateEventService(req);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Event updated successfully",
            event,
        });
    } catch (error) {
        next(error);
    }
};

// delete event
exports.deleteEvent = async (req, res, next) => {
    try {
        const deletedEvent = await deleteEventService(req);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Event deleted successfully",
            deletedEvent,
        });
    } catch (error) {
        next(error);
    }
};

// change event status
exports.changeStatusEvent = async (req, res, next) => {
    try {
        const event = await changeStatusEventService(req);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Event status changed successfully",
            event,
        });
    } catch (error) {
        next(error);
    }
};