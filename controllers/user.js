import { asyncError } from "../middleware/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import {getDataUri, sendEmail, sendToken} from "../utils/features.js"
import cloudanary from "cloudinary";



export const login = asyncError(async(req, res, next) => {

  const {email, password} = req.body
  if(!email) return next(new ErrorHandler("Please Enter Email", 400))
  
  
  const user = await User.findOne({email}).select("+password")
  if (!user) {
    return next(new ErrorHandler("Incorrect Email", 400));
  }

  if (!password) return next(new ErrorHandler("Please Enter Password", 400));

  


  // Handler Error 
  const isMatched = await user.comparePassword(password)
  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Password", 400));
  }

  sendToken(user, res, 'Login Succussfully', 201)


})




export const signUp = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode, role } = req.body;

  

  
  // console.log(req.file)
  // Image 
  let avatar = undefined
  const timestamp = Math.round(new Date() /1000);
  try{
    if(req.file) {
      const file = getDataUri(req.file)
      // console.log(file)
      const myCloud = await cloudanary.v2.uploader.upload(file.content)
      // console.log(myCloud)
      avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
      
    }

    // console.log(timestamp)
  }catch(error){
    console.log(error)
  }
  



  let user = await User.create({
    avatar,
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
    role,
    
  });
  sendToken(user, res, 'Register Successfully', 201)


})

export const getProfile = async(req, res, next) => {
  const user = await User.findById(req.user._id)
    
  res.status(200).json({
    success:true,
    user
  })

}


export const forgotPassword  = asyncError(async(req, res, next) => {

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("Incorrect Email", 535));

  // max, min 2000, 10000
  // Math.random()*(max-min) + min

  const randomNumber = Math.random() * (999999 - 100000) + 100000;
  const otp = Math.floor(randomNumber);
  const otp_expire = 15 * 60 * 1000;

  user.otp = otp;
  user.otp_expire = new Date(Date.now() + otp_expire);
  await user.save();
  console.log(otp);

  // send Email
  const message = `You otp for Reseting password is ${otp}. \n please Ignore if you have not requeseted this.`;
  try {
    await sendEmail("OTP for Reseting Password", user.email, message);
  } catch (error) {
    user.otp = null;
    user.otp_expire = null;
    await user.save();
    return next(error);
  }

  res.status(200).json({
    
    success: true,
    message: `Email send to ${user.email}`,
  });



}
)


export const resetPassword = asyncError(async (req, res, next) => {

  const {otp, password} = req.body
  const user = await User.findOne({
    otp,
    otp_expire:{
      $gt:Date.now()
    }
  })

  if (!user){
    return next(new ErrorHandler("Incorrect Otp or has been expired", 400))
  }

  if(!password){
    return next(new ErrorHandler("Please Enter New Password", 400))
  }
  

  user.password  =  password
  user.otp = undefined
  user.otp_expire = undefined

  await user.save()
  res.status(200).json({
    success:true,
    message:"password Changed Successfully"
  })
  


})

export const logout = asyncError(async (req, res, next) => {


  res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message:"Logged Out SuccessFully"
  });
});




export const changePassword = async(req,res, next) => {

  const user = await User.findById(req.user._id).select("+password")
  const {oldPassword, newPassword} = req.body

  if(!newPassword){
    return next(new ErrorHandler("Please Enter New Password", 400))
  }
  if(!oldPassword){
    return next(new ErrorHandler("Plaase Enter New Password", 400))
  }


  const isMatched = await user.comparePassword(oldPassword)
  if(!isMatched) return next(new ErrorHandler("Incorrect Old Password", 400))

  user.password = newPassword
  await user.save()

  res.status(200).json({
    success:true,
    message:"Password changed Successfully"
  })

}





export const updateProfile = async(req, res, next) => {

  const user = await User.findById(req.user._id)
  const {name, email} = req.body 

  if(!name){
    return next(new ErrorHandler("Please Enter name", 400))
  }

  if(!email){
    return next(new ErrorHandler("Please Enter Email", 400))
  }

  if (name) user.name = name
  if (email) user.email = email

  await user.save()
  res.status(200).json({
    success:true,
    message:"Profile updated Succefully"
  })

}




export const updatePic = async(req, res, next) => {

  const user = await User.findById(req.user._id)

  const file = getDataUri(req.file)
  await cloudanary.v2.uploader.destroy(user.avatar.public_id)
  const myCloud = await cloudanary.v2.uploader.upload(file.content)
  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url
  }
  await user.save()
  res.status(200).json({
    success:true,
    message:"Image is Updated Successfully"
  })
 
}