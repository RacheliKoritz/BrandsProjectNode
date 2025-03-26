import { Router } from "express";
import {addUser,getAllUsers,getUserById,updateUserById,updateUserPassword,loginUser}from "../controllers/user.js"
import { check,checkManager } from "../middlewares/validateToken.js";
const router=Router();
// ניתובים לכל הקריאות

router.get("/",checkManager,getAllUsers);
router.get("/:id",check,getUserById);
router.post("/",addUser);
router.put("/:id",check,updateUserById);
router.put("/password/:id",check,updateUserPassword);
router.post("/login",loginUser);
export default router;