import { Router } from "express";
import {deleteOrderById, getAllOrders,addOrder,getAllOrdersByUserId,updateOrderById} from "../controllers/order.js"
import{check,checkManager}from "../middlewares/validateToken.js"

const router=Router();
// ניתובים לכל הקריאות

router.get("/",checkManager,getAllOrders);
router.get("/:id",check,getAllOrdersByUserId);
router.post("/",check,addOrder);
router.put("/:id",checkManager,updateOrderById);
router.delete("/:id",checkManager,deleteOrderById);

export default router;