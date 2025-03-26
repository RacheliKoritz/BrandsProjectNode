import { Schema, model } from "mongoose";

    const filterSchema = new Schema({
        gender: String,
        filter: String,
        value: String
    });

// ייבוא המודל בצורה נכונה
export const filterModel = model("Filter", filterSchema);




