import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter email"],
    unique: [true, "Email Already Exist"],
    validator: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [6, "Password must be at least 6 character long"],
    select: false,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    public_id: String,
    url: String,
  },
  otp: Number,
  otp_expire: Date,
});

// Hash password function
schema.pre("save", async function () {
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);
});

// compare  password
schema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// generate Password 
schema.methods.generateToken = function (){
    return jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {
        expiresIn:"15d"
    })
}



export const User = mongoose.model("User", schema);
