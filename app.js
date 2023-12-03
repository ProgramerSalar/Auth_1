import express from "express";
import { config } from "dotenv";
export const app = express();
config({
  path: "./data/config.env",
});
import cookieParser from "cookie-parser";

// middleware
app.use(express.json());
app.use(cookieParser())


// Routes
import user from "./routes/user.js";
import { errorMiddleware } from "./middleware/error.js";

app.use("/api/v1/user", user);

// error Handler

app.use(errorMiddleware);
