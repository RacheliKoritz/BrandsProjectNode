import { Router } from "express";
import {getAllFilter,addFilter,deleteFilterById}from "../controllers/filter.js";
import {checkManager}from "../middlewares/validateToken.js"


const router=Router();
// ניתובים לכל הקריאות

router.get("/",getAllFilter);
router.post("/",checkManager,addFilter);
router.delete("/:id",checkManager,deleteFilterById);

export default router;
