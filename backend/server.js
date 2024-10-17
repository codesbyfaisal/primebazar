import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import imagesRouter from './routes/imagesRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/auth/user', userRouter)
app.use('/product/', productRouter)
app.use('/images', imagesRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

// Route Api
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Listen
app.listen(port, () => console.log(`Server running on port: ${port}`))