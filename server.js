import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import cloudanary from 'cloudinary'


cloudanary.v2.config({
    cloud_name:process.env.CLOUDANARY_NAME,
    api_key:process.env.CLOUDANARY_API_KEY,
    api_secret:process.env.CLOUDANARY_API_SECRET,
})



app.listen(process.env.PORT, () => {
    console.log('server is running on port:5000')
})


// database 
connectDB()