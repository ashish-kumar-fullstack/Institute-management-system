const express = require("express");
const {
  registerInstitute,
  login,
  getMe,
  logout
} = require("../controllers/authController");

const {isUserLoggedIn} = require('./../middleware/authMiddleware')

const router = express.Router();

router.post("/institute-register", registerInstitute);
router.post("/login", login);
router.get("/me",isUserLoggedIn, getMe);
router.post("/logout", logout);

module.exports = router;