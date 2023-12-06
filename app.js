import express from "express"
import cors from "cors"
export const app = express()



// middleware 
app.use(express.json())
app.use(cors(
    {
        credentials:true,
        methods:["GET","POST"],
        origin:[process.env.FRONTENT_URL_1, process.env.FRONTENT_URL_2]
    }
))




// Routes 
import user from "./routes/user.js"




app.use('/api/v1/user', user )