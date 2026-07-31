const { verifyAccessToken } = require("../utils/token");
const ApiError = require("../utils/ApiError");
 
const isUserLoggedIn = (req, res, next)=>{
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        throw new ApiError(401, "Please login first ")
    }
    
    const decoded = verifyAccessToken(accessToken);
    if(!decoded){
        throw new ApiError(401, "Invalid token ")
    }
    req.user = decoded;
    next();
}