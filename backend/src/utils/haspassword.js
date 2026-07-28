const bcrypt = require("bcrypt");
const hashPassword = (planPassword) => {
  return bcrypt.hash(planPassword, 10);
};

module.exports = hashPassword;