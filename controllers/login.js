import { User } from "../models/user.js";




export const login = () => {



    console.log('hello world')


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