import { asyncError } from "../middleware/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import { sendToken } from "../utils/features.js";

export const signUp = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode, role } =
    req.body;

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User Already Exists", 400));

  user = await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });
  sendToken(user, res, "Register Successfully", 201);
});

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Incorrect Email", 400));
  }

  // Handler Error
  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Password", 400));
  }

  sendToken(user, res, `Welcome Back ${user.name}`, 200);
});

export const getMyProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});



export const logout = asyncError(async(req, res,next) => {

  res.status(200).cookie("token", "", {
    expires: new Date(Date.now())
  }).json({
    success:true,
    message:"Logged Out Succussfully"
  })


})



export const Profile = () => {

  console.log('hello world')
}