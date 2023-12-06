import mongoose from "mongoose";
import validator from "validator";


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
        default:"user"
    },
    avatar:{
        public_id:String,
        url:String
    },
    otp:Number,
    otp_expire:Date,


})

export const User = mongoose.model("User", schema)