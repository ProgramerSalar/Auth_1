import express from "express"
import cors from "cors"
export const app = express()
import { config } from "dotenv"
config({
    path:"./data/config.env",
})


// middleware 
app.use(express.json())
app.use(cors({
    // credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    origin:[process.env.FRONTENT_URL_1, process.env.FRONTENT_URL_2],
  }))




// Routes 
import user from "./routes/user.js"
import { errorMiddleware } from "./middleware/error.js"





app.use('/api/v1/user', user )





// error middleware 
app.use(errorMiddleware)