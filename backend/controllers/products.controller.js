import { v2 as cloudnary } from 'cloudinary'
import productModel from '../models/product.model.js';

// function for addProduct
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, colors, bestSeller, sale, saleOff, inStock, feature } = req.body

    const images = req.files.images

    const productExist = await productModel.findOne({ name })

    if (productExist) return res.json({ success: false, message: "Product with the same name already exist" })

    const imagesUrl = await Promise.all(
      images.map(async (img) => {
        const result = await cloudnary.uploader.upload(img.path, { resource_type: 'image' })
        return result.secure_url
      })
    )

    const productData = {
      name, description,
      price: Number(price),
      images: imagesUrl,
      category, subCategory,
      sizes: sizes.split(','),
      colors: colors.split(','),
      bestSeller,
      sale,
      saleOff,
      inStock,
      feature,
      date: Date.now(),
    }

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message: "Product successfully added" })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
};

// function for removeProduct
const removeProduct = async (req, res) => {
  try {
    const { _id } = req.body;

    const product = await productModel.findById(_id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    const imageUrls = product.images;

    const images = imageUrls.map(url => {
      const parts = url.split('/');
      const lastSegment = parts.pop();
      return lastSegment.split('.')[0];
    });

    await new Promise((resolve, reject) => {
      cloudnary.api.delete_resources(images, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });

    await productModel.findByIdAndDelete(_id);

    res.json({ success: true, message: "Product Successfully Removed" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for singleProduct
const singleProduct = async (req, res) => {
  try {
    const { _id } = req.body
    const product = await productModel.findOne({ _id })
    res.json({ success: true, product })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
};

// function for allProducts
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({ success: true, products })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
};

export { addProduct, removeProduct, singleProduct, listProducts };