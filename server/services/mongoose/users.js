const User = require("../../api/users/model.js");
const Organizer = require("../../api/organizers/model.js");
const BadRequestError = require("../../errors/bad-request.js");

// create organizer service
exports.createOrganizerService = async (req) => {
  const { name, email, role, password, confirmPassword, organizerName } =
    req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password doesn't match");
  }

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new BadRequestError("Email already exist");
  }

  const newOrganizer = await Organizer.create({ organizerName });

  const newUser = await User.create({
    name,
    email,
    role,
    password,
    organizer: newOrganizer._id,
  });

  delete newUser._doc.password;

  return newUser;
};

// create user service
exports.createUserService = async (req) => {
  const { name, email, role, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password doesn't match");
  }

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new BadRequestError("Email already exist");
  }

  const newUser = await User.create({
    name,
    email,
    role,
    password,
    organizer: req.user.organizer,
  });

  delete newUser._doc.password;

  return newUser;
};

// get all users service
exports.getUsersService = async (req) => {
  const users = await User.find().populate("organizer").select("-password");

  return users;
};
