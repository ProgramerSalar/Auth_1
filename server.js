import { app } from "./app.js";
import { connectDB } from "./data/database.js";
// import cloudanary from 'cloudinary'
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name:process.env.CLOUDANARY_NAME,
    api_key:process.env.CLOUDANARY_API_KEY,
    api_secret:process.env.CLOUDANARY_API_SECRET,
})

const signUpload = async () => {
    const timestamp = Math.round(newDate() /1000);
    const params = {
      timestamp: timestamp
    };
    const signature = await cloudinary.utils.api_sign_request(params, process.env.CLOUDANARY_API_SECRET);
    return { timestamp, signature };
  }


app.listen(process.env.PORT, () => {
    console.log('server is running on port:5000')
})


// database 
connectDB()