import { asyncError } from "../middleware/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import {getDataUri} from "../utils/features.js"
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
  if(req.file) {
    const file = getDataUri(req.file)
    const myCloud = await cloudanary.v2.uploader.upload(file.content)
    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
    
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