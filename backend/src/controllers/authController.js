const bcrypt = require('bcrypt')
const ApiError = require('../utils/ApiError');
const createSlug = require('../utils/slug');
const Institute = require('../models/institute');
const User = require('../models/user');
const hashPassword = require('../utils/hashpassword');
const {generateAccessToken} = require('../utils/token.js');
hashPassword
const registerInstitute = async (req, res )=>{
    const {instituteName, adminName , slug, email, password  } = req.body ;

    try {
        if(!instituteName || !adminName || !slug || !email || !password) {
            throw new ApiError(400, "Please fill all the fields ")
        }
        if(password.length < 6){
            throw new ApiError(400, "Password is too short ")
        }
        const isSlugExist = await  Institute.findOne({slug});
        if(isSlugExist){
            throw new ApiError(400, "Slug already exists ")
        }
        const isEmailExist = await  Institute.findOne({email});
        if(isEmailExist){
            throw new ApiError(400, "Email already exists ")
        }
        const tenantSlug = createSlug(slug || instituteName);

        let institute = new Institute({
            name: instituteName,
            slug: tenantSlug,
            email,
        })
        await institute.save();
        const hashedPassword = await hashPassword(password);
        let user = new User({
            name: adminName,
            email,
            passwordHash: hashedPassword,
            role: "institute_admin",
            instituteId: institute._id,
        })
        await user.save();

        institute.ownerUserId = user._id;
        await institute.save();

        const accessToken = generateAccessToken({
            user: user._id.toString(),
            tenantId: institute._id.toString(),
            role: user.role
        });
        res.status(200).json({msg:"Institute Created Successfully ",  accessToken})

        
        
    } catch (error) {
        res.status(500).json({msg:"Intitute creation ERROR!", error:error.message});
        
    }
}

const login =async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(400, "Please fill all the fields ")
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({email: normalizedEmail, isActive: true,}).select("+passwordHash");
    if(!user){
        throw new ApiError(400, "User not found ")
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if(!isPasswordValid){
        throw new ApiError(400, "Password is incorrect ")
    }

    const accessToken = generateAccessToken({
        Loginuser: user._id.toString(),
        loginInstitute : user.instituteId.toString(),
        role: user.role
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })
    return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        instituteId: user.instituteId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });

}

module.exports = {
    registerInstitute,
    login
}