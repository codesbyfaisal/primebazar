import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/admin.auth.js";

const imagesRouter = express()

imagesRouter.post('/add')

export default imagesRouter