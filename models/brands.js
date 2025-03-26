import { Schema, model } from "mongoose";

const brandsSchema = Schema({
    nameBrand: String,
    modelBrand: String,
    productionDate: { type: Date, default: Date.now },
    srcImg: String,
    price: Number,
    gender:[String],
    category: String,
   size: [String]
})

export const brandsModel = model("brands", brandsSchema);