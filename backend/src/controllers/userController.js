const User = require('../models/User');
const getMe = async (req, res )=>{
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({msg:"User Found Successfully ", user});
}

module.exports = {
    getMe
}
