import { app } from "./app.js";
import { connectDB } from "./data/database.js";





app.listen(5000, () => {
    console.log('server is running on port:5000')
})


// database 
connectDB()