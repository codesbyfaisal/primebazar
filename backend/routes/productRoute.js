import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/products.controller.js"
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/admin.auth.js";

const productRouter = express.Router()
productRouter.post('/add', adminAuth, upload.fields([{ name: 'images', maxCount: 4 }]), addProduct)
productRouter.post('/remove', adminAuth, removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProducts)

export default productRouter