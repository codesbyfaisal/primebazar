import express from "express";
import { placeOrder, ordersList, userOrders, orderStatus, cancelOrder } from "../controllers/order.controller.js";
import adminAuth from "../middleware/admin.auth.js";
import userAuth from "../middleware/user.auth.js";
const orderRouter = express()

// admin
orderRouter.post('/list', adminAuth, ordersList)
orderRouter.post('/status', adminAuth, orderStatus)

// payments
orderRouter.post('/place', userAuth, placeOrder)

// user
orderRouter.post('/userorders', userAuth, userOrders)
orderRouter.post('/cancel', userAuth, cancelOrder)

export default orderRouter