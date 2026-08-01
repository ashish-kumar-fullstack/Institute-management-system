const express = require("express");
const {
  registerInstitute,
  login,
} = require("../controllers/authController");

const router = express.Router();

router.post("/institute-register", registerInstitute);
router.post("/login", login);

module.exports = router;