import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js';

// Update Cart
const updateCart = async (req, res) => {
  try {
    const { userId, updatedItem } = req.body;
    const user = await userModel.findOne({ _id: userId });

    const { _id, size, color, quantity } = updatedItem;
    let cartData = user.cartData || [];

    const existingItemIndex = cartData.findIndex(
      (item) => item._id === _id && item.size === size && item.color === color
    );

    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].quantity = quantity;
    } else {
      cartData.push({ ...updatedItem });
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const { userId, _id, size, color } = req.body;

    const user = await userModel.findOne({ _id: userId });

    const updatedCartData = user.cartData.filter(
      (item) => !(item._id === _id && item.size === size && item.color === color)
    );

    await userModel.findByIdAndUpdate(userId, { cartData: updatedCartData });

    res.json({ success: true, message: "Item removed from cart Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getCartData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findOne({ _id: userId });
    const cartData = user.cartData
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export { updateCart, deleteCartItem, getCartData };