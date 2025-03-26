import { Schema, model } from "mongoose";

const userSchema = Schema({
    userName: String,
    mail: String,
    password: String,
    role: String,
    dateSignIn: Date
})

export const userModel = model("users", userSchema);
 