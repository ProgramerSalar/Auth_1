import mongoose from "mongoose";
import { app } from "./app.js";
import { connectDB } from "./data/database.js";



app.listen(process.env.PORT, () => {
    console.log('server is running.............')
    // console.log(process.env.MONGO_URL)


})



// Database 
connectDB()
