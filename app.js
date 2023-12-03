import express from "express";
import { config } from "dotenv";
export const app = express();
config({
  path: "./data/config.env",
});
import cookieParser from "cookie-parser";
import cors from "cors"


// middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  Credentials:true,
  methods:["GET", "POST", "PUT", "DELETE"],
  origin:[process.env.FRONTENT_URL_1,process.env.FRONTENT_URL_2]
}))


// Routes
import user from "./routes/user.js";
import { errorMiddleware } from "./middleware/error.js";

app.use("/api/v1/user", user);

// error Handler

app.use(errorMiddleware);
