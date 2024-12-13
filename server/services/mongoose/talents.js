const { BadRequestError, NotFoundError } = require("../../errors");
const { getSingleImageService } = require("./images");
const Talent = require("../../api/talents/model");

// cretae talent service
exports.createTalentService = async (req) => {
  const { name, role, imageId } = req.body;

  if (!imageId) {
    throw new BadRequestError("Image is required");
  }

  await getSingleImageService(imageId);

  const isTalentExist = await Talent.findOne({
    name,
    organizer: req.user.organizer,
  });
  if (isTalentExist) {
    throw new BadRequestError("Talent already exist");
  }

  const talent = (
    await Talent.create({
      name,
      role,
      image: imageId,
      organizer: req.user.organizer,
    })
  ).populate({
    path: "image",
    select: "_id url",
  });

  return talent;
};

// get all talents service
exports.getTalentsService = async (req) => {
  const { keyword } = req.query;

  let conditions = { organizer: req.user.organizer };
  if (keyword) {
    conditions = { ...conditions, name: { $regex: keyword, $options: "i" } };
  }

  console.log(conditions);

  const talents = await Talent.find(conditions)
    .populate({
      path: "image",
      select: "_id url",
    })
    .select("_id name role image");

  return talents;
};

// get single talent service
exports.getSingleTalentService = async (req, id) => {
  const talent = await Talent.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id url",
    })
    .select("_id name role image");

  if (!talent) {
    throw new NotFoundError("Talent not found");
  }

  return talent;
};

// update talent service
exports.updateTalentService = async (req) => {
  const { id } = req.params;
  const { name, role, imageId } = req.body;

  const isIdExist = await Talent.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!isIdExist) {
    throw new NotFoundError("Talent not found");
  }

  const isNameExist = await Talent.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });
  if (isNameExist) {
    throw new BadRequestError("Talent already exist");
  }

  await getSingleImageService(imageId);

  const talent = await Talent.findOneAndUpdate(
    { _id: id },
    { name, role, image: imageId, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  return talent;
};

// delete talent service
exports.deleteTalentService = async (req) => {
  const { id } = req.params;

  const talent = await Talent.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!talent) {
    throw new NotFoundError("Talent not found");
  }

  await Talent.findOneAndDelete({ _id: id });

  return talent;
};

exports.checkTalentService = async (id) => {
  const talent = await Talent.findOne({ _id: id });
  if (!talent) {
    throw new NotFoundError("Talent not found");
  }

  return talent;
};
