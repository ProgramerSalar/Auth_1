import { User } from "../models/user.js";
import {getDataUri} from "../utils/features.js"
import cloudanary from "cloudinary";



export const login = async(req, res, next) => {

    const {email, password} = req.body
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(400).json({
            success:false,
            message:"incorrect Email"
        })
    }


    // Handler Error 
    const isMatched = await user.comparePassword(password)
    if(!isMatched){
        return res.status(400).json({
            success:false,
            message:"Incorrect Password"
        })
    }

    res.status(200).json({
        success:true,
        message:`Welcome back ${user.name}`
    })


}


// export const signUp = async(req, res, next) => {

//     const {name, email, password} = req.body;

//     // avatar 
//     let avatar = undefined
//     if(req.file){
//         const file = getDataUri(req.file)
//         const myCloud = await cloudanary.v2.uploader.upload(file.content)
//         avatar = {
//             public_id:myCloud.public_id,
//             url:myCloud.secure_url,
//         }
//     }

    
//     await User.create({
//         avatar,name,email,password
//     })
//     res.status(201).json({
//         success:true,
//         message:"Register Successfully"
//     })
// }


export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
  
    
  
    
  
    let avatar = undefined;
    if (req.file) {
      const file = getDataUri(req.file);
      const myCloud = await cloudanary.v2.uploader.upload(file.content);
      avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    user = await User.create({
      // avatar,
      name,
      email,
      password,
      
    });
    res.status(400).json({
      success:true,
      message:'Register Successfully'
    })
  

  }

export const getProfile = (req, res, next) => {
    res.send('hello world')
}