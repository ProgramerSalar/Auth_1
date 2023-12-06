import mongoose from "mongoose";


export const connectDB = async () => {

    try{
        const {connection} = await mongoose.connect('mongodb+srv://udamy_user:vfVjiniUHSosqrV2@cluster0.8r3vhxn.mongodb.net/?retryWrites=true&w=majority')
        console.log('Database is connected...............')
    }catch(error){
        console.log(error)
    }
}