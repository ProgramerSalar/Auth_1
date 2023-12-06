import { User } from "../models/user.js";




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


export const signUp = async(req, res, next) => {

    const {name, email, password} = req.body;
    await User.create({
        name,email,password
    })
    res.status(201).json({
        success:true,
        message:"Register Successfully"
    })
}


export const getProfile = (req, res, next) => {
    res.send('hello world')
}