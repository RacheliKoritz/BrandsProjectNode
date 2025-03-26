import { brandsModel } from "../models/brands.js";
import { orderModel } from "../models/order.js";
import {userModel} from "../models/user.js";

export async function getAllOrders(req, res) {
    try {
        let data = await orderModel.find();
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to getAll",
            message: "something wrong "
        })
    }
}
export async function getAllOrdersByUserId(req, res) {
    let  id = req.params.id;
    try {
        let data = await orderModel.find({ userId: id });
        if (!data)
            return res.status(400).json({
                title: "error cannot connect to get byUserId",
                message: "no find orders from this userId"
            })
        res.json(data);
    }
    catch (err) {
        console.log("err"+ err);
        res.status(400).json({
            title: "error cannot connect to getByUserId",
            message: "something wrong "
        })
    }

}
export async function addOrder(req, res) {
    if (!req.body.userId)
        return res.status(400).json({
            title: "erorr to add order",
            message: "you must enter userId "
        });
    if (!req.body.address)
        return res.status(400).json({
            title: "erorr to add order",
            message: "you must enter address "
        });
    if (!req.body.brands)
        return res.status(400).json({
            title: "erorr to add order",
            message: "you must enter brands "
        });
    try {
       let brCode=req.body.brands.map(b=>b._id);
       let exist=await brandsModel.find({_id:{$in :brCode}})

       if (exist.length !== brCode.length) 
        return res.status(400).json({
            title: "error to add order",
            message: "One or more brands do not exist in the database"
        });
        let newOrder = new orderModel(req.body);
        newOrder.deadline.setDate(newOrder.deadline.getDate() + 14);
        newOrder.totalPrice = Number(newOrder.brands.reduce((sum, b) => sum + Number(b.price) * Number(b.qty), 0)) + Number(newOrder.priceOrder);
        console.log(newOrder);
        let data = await newOrder.save();
        res.json(data);
}
    catch (err) {
        console.log("err"+err);
        res.status(400).json({
            title: "error cannot connect to add order",
            message: "something wrong "
        })
    }
}
export async function updateOrderById(req, res) {
    let { id } = req.params;
    try {
        let data = await orderModel.findByIdAndUpdate(id, { isSent: true }, { new: true });
        console.log(data);
        if (!data)
            return res.status(400).json({
                title: "erorr to update order",
                message: "no find order to update "
            });
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to update order",
            message: "something wrong "
        })
    }

}
export async function deleteOrderById(req, res) {
    let id = req.params.id;
    try {
        let data = await orderModel.findById(id);
        if (!data)
            return res.status(400).json({
                title: "erorr to delete brand",
                message: "no find order to delete "
            });
        if (data.isSent == true)
            return res.status(400).json({
                title: "erorr to delete order",
                message: "the order is sent "
            });
        data = await orderModel.findByIdAndDelete(id);
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to delete order",
            message: "something wrong "
        });
    }

}
