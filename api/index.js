import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// const helmet = require("helmet");
import auth_router from "./routes/auth_router.js";
import user_router from "./routes/user_router.js";
import post_router from "./routes/post_router.js";
// import upload_router from "./routes/upload_router.js";

//? Routes
const app = express();

//? Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

//? Serve images
app.use(express.static('public')); 
app.use('/images', express.static('images'));

mongoose
   .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() =>
      app.listen(process.env.PORT, () =>
         console.log(`Listening on port ${process.env.PORT} `)
      )
   )
   .catch((error) => console.log(error));

//? Usage of routes
app.use("/auth", auth_router);
app.use("/user", user_router);
app.use("/post", post_router);
app.use("/upload", upload_router);
