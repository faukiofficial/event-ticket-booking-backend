const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const attachCookiesToResponse = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
