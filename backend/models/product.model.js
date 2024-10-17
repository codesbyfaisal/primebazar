import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  colors: { type: Array, required: true },
  bestSeller: { type: Boolean },
  sale: { type: Boolean, required: true },
  saleOff: { type: Number },
  inStock: { type: Boolean, required: true },
  feature: { type: Boolean, required: true },
  date: { type: Number, required: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel