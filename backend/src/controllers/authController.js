const Institute = require('./../models/Institute.js')

const hashpassword = require('./../utils/haspassword.js')

const instituteRegister = async (req, res) => {
 try {
     const { name, email, district, state, phone, password ,logo, address } = req.body
     if(!name || !email || !district || !state || !phone || !password){
        return res.status(400).json({msg: 'All fields are required'})
     }

     if(password.length < 6 ){
        return res.status(400).json({msg:'Password is too short'})
     }

     const isUserExist = await Institute.findOne({email : email})
     if(isUserExist){
        return res.status(400).json({msg:'Email already registered'})
     }
     const hashedPassword = await hashpassword(password)
     const institute = new Institute({
        name,
        email,
        district,
        state,
        phone,
        logo,
        password: hashedPassword,
        address:{
         line1: address.line1,
         line2: address.line2,
         city: address.city,
         district: address.district,
         state: address.state,
         country: address.country,
         pincode: address.pincode,
        },
       
       
     })
     const savedInstitute = await institute.save()
     const instituteData = savedInstitute.toObject ? savedInstitute.toObject() : { ...savedInstitute }
     return res.status(200).json({msg:'Institute registered successfully', institute: {...instituteData, password: savedInstitute.password}})


     
 } catch (error) {
    res.status(500).json({msg:'Institute registration error!!', err: error})
 }
  
};
const login = (req, res) => {
  res.send("login");
};
const logout = (req, res) => {
  res.send("logout");
};

module.exports = {
  instituteRegister,
  login,
  logout,
};
