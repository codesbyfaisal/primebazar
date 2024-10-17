import express from 'express'
import { updateCart, deleteCartItem, getCartData } from '../controllers/cart.controller.js'
import userAuth from '../middleware/user.auth.js'

const cartRouter = express.Router();

cartRouter.post('/update', userAuth, updateCart)
cartRouter.post('/delete', userAuth, deleteCartItem)
cartRouter.post('/items', userAuth, getCartData)

export default cartRouter