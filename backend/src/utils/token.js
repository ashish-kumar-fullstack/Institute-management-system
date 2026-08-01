const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");

const generateAccessToken = (user) => {
  if (!user?._id || !user?.instituteId) {
    throw new ApiError(
      500,
      "Invalid user information for token generation"
    );
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      instituteId: user.instituteId.toString(),
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "7d",
    }
  );
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};