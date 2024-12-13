const BadRequestError = require("../../errors/bad-request.js");
const UnauthorizedError = require("../../errors/unauthorized.js");
const { createJWT, attachCookiesToResponse } = require("../../utils/jwt.js");
const User = require("../../api/users/model.js");
const { StatusCodes } = require("http-status-codes");

// login user service
exports.loginUserService = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = createJWT({
    payload: {
      name: user.name,
      email: user.email,
      role: user.role,
      userId: user._id,
      organizer: user.organizer,
    },
  });

  attachCookiesToResponse({ res, token });

  return token;
};

// logout user service
exports.logoutUserService = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "User logged out successfully" });
};
