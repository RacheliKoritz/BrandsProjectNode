import { ObjectId } from "bson";
import { Schema, model, Types } from "mongoose";
import {brandsModel} from "./brands.js"

const brandInOrderSchema=Schema({
    _id:{type:ObjectId,ref:"brands"}, //
    nameBrand: String,
    nameItem: String,
    qty:Number,
    price:Number
});

const orderSchema = Schema({
    date:  { type: Date, default: new Date() },
    deadline: { type: Date, default: new Date() },
    address: String,
    userId: ObjectId,
    brands: [brandInOrderSchema],
    isSent: { type: Boolean, default: false },
    priceOrder: {type:Number,default:0},
    totalPrice: Number

});





export const orderModel = model("orders", orderSchema);
