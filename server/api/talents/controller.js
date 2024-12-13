const { StatusCodes } = require("http-status-codes");
const {
  createTalentService,
  getTalentsService,
  getSingleTalentService,
  updateTalentService,
  deleteTalentService,
} = require("../../services/mongoose/talents");

// create talent
exports.createTalent = async (req, res, next) => {
  try {
    const talent = await createTalentService(req);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Talent created successfully",
      talent,
    });
  } catch (error) {
    next(error);
  }
};

// get all talents
exports.getTalents = async (req, res, next) => {
  try {
    const talents = await getTalentsService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Talents fetched successfully",
      talents,
    });
  } catch (error) {
    next(error);
  }
};

// get single talent
exports.getSingleTalent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talent = await getSingleTalentService(id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Talent fetched successfully",
      talent,
    });
  } catch (error) {
    next(error);
  }
};

// update talent
exports.updateTalent = async (req, res, next) => {
  try {
    const talent = await updateTalentService(req);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Talent updated successfully",
      talent,
    });
  } catch (error) {
    next(error);
  }
};

// delete talent
exports.deleteTalent = async (req, res, next) => {
  try {
    const deletedTalent = await deleteTalentService(req);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Talent deleted successfully",
      deletedTalent,
    });
  } catch (error) {
    next(error);
  }
};
