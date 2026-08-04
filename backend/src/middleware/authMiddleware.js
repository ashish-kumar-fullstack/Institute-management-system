const { verifyAccessToken } = require("../utils/token");
const ApiError = require("../utils/ApiError");
const isUserLoggedIn = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  

  if (!accessToken) {
    return next(new ApiError(401, "Please login first"));
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports= {
    isUserLoggedIn
}