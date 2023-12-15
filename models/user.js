import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const schema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "please Enate Name"]
    },
    email:{
        type:String,
        required:[true, "Please Enter Email"],
        unique:[true, "Eamil Already Exists"],
        validator:validator.isEmail
    },
    password:{
        type:String,
        required:[true, "Please Enter Password"],
        minLength:[4,"Password must be at least 4 character long"],
        select:false
    },
    role:{
        type:String,
        enum:["admin", "user"],
        required:[true, "Please Enter admin or User"],
    },
    avatar:{
        public_id:String,
        url:String
    },
    otp:Number,
    otp_expire:Date,


})


// Hash password 
schema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    // console.log(this.password);
    this.password = await bcrypt.hash(this.password, 10); // hash this password in 10 character
  });


// compare password function 
schema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


// generate token
schema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
  };


export const User = mongoose.model("User", schema)