import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from 'multer';

import { connectToDB } from "./config/DB.js"
import brandsRouter from "./routes/brands.js";
import  userRouter  from "./routes/user.js";
import  orderRouter  from "./routes/order.js";
import filterRouter from "./routes/filter.js";
import logToFile from "./middlewares/logToFile.js";


dotenv.config();
connectToDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(logToFile);
app.use(express.static("files/images"))

app.use("/brands", brandsRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/filter",filterRouter)

let port=process.env.PORT;
app.listen(port,"localhost",()=>{
    console.log("app is running on port "+ port);
});






