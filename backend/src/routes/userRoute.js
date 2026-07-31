const express = require('express')
const router = express.Router();

const {getMe} = require('../controllers/userController');

router.get('/:id',getMe)

module.exports = router;
