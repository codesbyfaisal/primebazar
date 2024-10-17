import userModel from '../models/user.model.js'
import orderModel from '../models/order.model.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user registeration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    // checking user exist or not
    const exist = await userModel.findOne({ email })

    if (exist) {
      return res.json({ success: false, message: "user already exist" })
    }

    //  validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter a valid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "password must be 8 chracter long" })
    }

    if (!validator.isStrongPassword(password)) {
      return res.json({ success: false, message: "please enter a strong password" })
    }

    //  hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const time = new Date()

    const newUser = new userModel({
      name, email, password: hashPassword, time
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({ success: true, message: "user successfully register", token })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "password or email are invalid" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = createToken(user._id)
      return res.json({
        success: true, message: "successfully Login", token, user: {
          username: user.name,
          useremail: user.email,
        }
      })
    } else {
      return res.json({ success: false, message: "password or email are invalid" })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Route for delete user
const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // Delete user from database
    await userModel.findOneAndDelete({ email });

    // Find and delete all orders for this user
    const userId = user._id;
    await orderModel.deleteMany({ userId });

    return res.json({ success: true, message: "Account and all associated orders deleted successfully" });

  } catch (error) {
    console.error("Error deleting user or orders:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      return res.json({ success: true, message: "Admin Loggin successfully", token })
    }
    res.json({ success: false, message: "Email or passsword is incorrect" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export { loginUser, registerUser, adminLogin, deleteUser }