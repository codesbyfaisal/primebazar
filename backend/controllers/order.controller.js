import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"

// Placing order on COD *client*
const placeOrder = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, items, amount, deliveryFee, address, paymentMethod } = req.body

    if (amount <= 0) {
      return res.json({ success: false, message: "please first add Product to cart" })
    }

    items.forEach(async (item) => {
      const newOrder = {
        userId,
        name: {
          firstName,
          lastName,
        },
        email,
        item,
        amount,
        deliveryFee,
        address,
        status: 'order placed',
        paymentMethod,
        payment: false,
        date: new Date()
      }

      const order = new orderModel(newOrder)
      await order.save()
    });

    await userModel.updateOne({ _id: userId }, { $set: { cartData: [] } });

    res.json({ success: true, message: "Order place successfully" })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// admin orderlist *admin*
const ordersList = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// admin order status changing *admin*
const orderStatus = async (req, res) => {
  const { orderId, newStatus } = req.body
  try {
    const order = await orderModel.findByIdAndUpdate({ _id: orderId }, { status: newStatus })
    res.json({ success: true, message: "Order Status change" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// userOrders list *client*
const userOrders = async (req, res) => {
  const userId = req.body.userId
  try {
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// cancelOrder *client*
const cancelOrder = async (req, res) => {
  const { orderId } = req.body
  try {
    const order = await orderModel.findByIdAndUpdate({ _id: orderId }, { status: 'cancelled' })
    res.json({ success: true, message: "Order Cancel Successfully", order })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export { placeOrder, ordersList, userOrders, orderStatus, cancelOrder }