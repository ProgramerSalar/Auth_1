import { asyncError } from "../middleware/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import {getDataUri, sendEmail} from "../utils/features.js"
import cloudanary from "cloudinary";



export const login = asyncError(async(req, res, next) => {

  const {email, password} = req.body
  
  const user = await User.findOne({email}).select("+password")

  if(!user){
      return ErrorHandler("Incorrect Email", 400)
  }


  // Handler Error 
  const isMatched = await user.comparePassword(password)
  if(!isMatched){
      return ErrorHandler("Incorrect Password", 400)
  }

  res.status(200).json({
    
      success:true,
      message:`Welcome back ${user.name}`
  })


})




export const signUp = asyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  

  
  // console.log(req.file)
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
    
  });
  res.status(400).json({
    success:true,
    message:'Register Successfully'
  })


})

export const getProfile = (req, res, next) => {
    res.send('hello world')
}


export const forgotPassword  = async(req, res, next) => {

  const {email} = req.body
  const user = await User.findOne({email})

  // console.log(user)
  
  if(!user) return next(new ErrorHandler("Incoreect Email", 401))
  
  const randomNumber = Math.random() * (999999 - 100000) + 100000;
  const otp = Math.floor(randomNumber);
  const otp_expire = 15 * 60 * 1000;

  user.otp = otp;
  user.otp_expire = new Date(Date.now() + otp_expire);
  await user.save();
  console.log(otp)

  // send Email
  const message = `You otp for Reseting Password is ${otp}. \n please Ignore if you have not requested this.`
  try{
    await sendEmail("Otp for Reseting Password", user.email, message)

  }catch(error){
    user.otp = null;
    user.otp_expire = null
    await user.save()
    return next(error)

  }
  res.status(200).json({
    success:true,
    message:`Email send to ${user.email}`
  })

}