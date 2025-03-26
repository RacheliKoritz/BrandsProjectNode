import mongoose from "mongoose";


export function connectToDB() {
    mongoose.connect(process.env.DB_URI)
        .then( console.log("mongoDB is connected"))
        .catch(err => {
            console.log("cannot connected mongoDB ", err);
            process.exit(1);
        })



}