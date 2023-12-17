import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import cloudinary from "cloudinary"
import Stripe from "stripe"


// cloudinary.v2.config({
//     cloud_name:process.env.CLOUDANARY_NAME,
//     api_key:process.env.CLOUDANARY_API_KEY,
//     api_secret:process.env.CLOUDANARY_API_SECRET,
// })


cloudinary.v2.config({
    cloud_name:'dkyh6re1n',
    api_key:'657991277378528',
    api_secret:'mBnaAEfRTI522xI3QhqsU6Ekh-o',
})


export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

app.listen(process.env.PORT, () => {
    console.log('server is running on port:5000')
})


// database 
connectDB()