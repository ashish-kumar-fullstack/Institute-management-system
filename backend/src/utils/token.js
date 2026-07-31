const jwt = require('jsonwebtoken')

const generateAccessToken = (data) => {
    return jwt.sign(
        data,
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );}


const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
    module.exports = {
        generateAccessToken,
        verifyAccessToken
    }
