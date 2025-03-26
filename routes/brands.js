import { Router } from "express";

import {addBrand,deleteBrandById,getAllBrands,getBrandByBrand,getBrandById,updateBrandById,getNumPages}from "../controllers/brands.js";
import { uploadImage } from "../middlewares/upload.js";
import {checkManager}from "../middlewares/validateToken.js";


const router=Router();

// router.post("/", authAdmin, uploadImage, addProduct);
// ניתובים לכל הקריאות

router.get("/",getAllBrands);
router.get("/numPages", getNumPages)   
router.get("/brand", getBrandByBrand);
router.get("/:id",getBrandById);
router.post("/",checkManager,uploadImage,addBrand);
router.put("/:id",checkManager,uploadImage,updateBrandById);
router.delete("/:id",checkManager,deleteBrandById);

export default router;
