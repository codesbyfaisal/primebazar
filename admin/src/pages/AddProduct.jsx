import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { getToken } from "../utils/token.js";
import { toast } from "react-toastify";
import { ProductsContext } from "../context/ProductsContext.jsx";

const AddProduct = () => {
  const { getProductsList, serverUrl } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sale, setSale] = useState(false);
  const [saleOff, setSaleOff] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [feature, setFeature] = useState(false);
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = file;
        return updatedImages;
      });
    }
  };

  const handleSizeChange = (size) => {
    setSizes((prev) => {
      if (size === "One Size") {
        return prev.includes("One Size")
          ? prev.filter((s) => s !== "One Size")
          : [...prev.filter((s) => s === "One Size"), "One Size"];
      } else {
        if (prev.includes(size)) {
          return prev.filter((s) => s !== size);
        } else {
          return [...prev.filter((s) => s !== "One Size"), size];
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (description.length < 20) {
      toast.error("Product description must be at least 20 characters long.");
      setLoading(false);
      return;
    }
    if (sizes.length === 0) {
      toast.error("At least one size must be selected for the product.");
      setLoading(false);
      return;
    }
    if (images.filter((img) => img !== null).length === 0) {
      toast.error("Please upload at least one image.");
      setLoading(false);
      return;
    }
    if (sale && saleOff === "") {
      toast.error("Sale is selected, but no sale discount is provided.");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    // Append other product fields to formData
    formData.append("name", productName.trim());
    formData.append("description", description.trim());
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("colors", colors);
    formData.append("sizes", sizes);
    formData.append("sale", sale);
    formData.append("saleOff", saleOff);
    formData.append("bestSeller", bestSeller);
    formData.append("inStock", inStock);
    formData.append("feature", feature);

    // Append images to formData, only if they exist
    images.forEach((image, idx) => {
      if (image) {
        formData.append(`images`, image);
      }
    });

    try {
      const response = await fetch(serverUrl + "/product/add", {
        method: "POST",
        headers: {
          token: getToken(),
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        getProductsList();

        // Reset form fields after submission
        setProductName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setColors([]);
        setSizes([]);
        setSale(false);
        setSaleOff("");
        setBestSeller(false);
        setInStock(false);
        setImages([null, null, null, null]); // Reset images
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product\nPlease Try again later");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#ebebeb] max-w-xl">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            id="productName"
            className="w-full p-2 rounded-md transition-all ring-1 ring-primary/20 focus:ring-primary"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            id="description"
            className="w-full p-2 rounded-md transition-all ring-1 ring-primary/20 focus:ring-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        {/* Upload Images */}
        <div className="mb-4">
          <label className="block mb-2">Upload Images (1-4)</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((index) => (
              <label
                className="flex flex-wrap gap-4 mt-2"
                htmlFor={`image${index}`}
                key={index}
              >
                <input
                  type="file"
                  id={`image${index}`}
                  accept=".png, .jpg, .jpeg, .webp, .avif"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="hidden"
                />
                <img
                  src={
                    images[index]
                      ? URL.createObjectURL(images[index])
                      : assets.image_placeholder
                  }
                  alt="Preview"
                  className="w-20 h-20"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col xs:flex-row justify-between gap-2">
          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              id="category"
              className="w-full p-2 rounded-md transition-all ring-1 ring-primary/20 focus:ring-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Boy">Boys</option>
              <option value="Girl">Girls</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Subcategory */}
          <div className="mb-4">
            <label className="block mb-2">Subcategory</label>
            <select
              id="subCategory"
              className="w-full p-2 rounded-md transition-all ring-1 ring-primary/20 focus:ring-primary"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            >
              <option value="Outerwear">Outerwear</option>
              <option value="Dresses">Dresses</option>
              <option value="Footwear">Footwear</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Accessories">Accessories</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Activewear">Activewear</option>
              <option value="Knitwear">Knitwear</option>
              <option value="Bags">Bags</option>
              <option value="Sleepwear">Sleepwear</option>
              <option value="Shirts">Shirts</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-2">Price ($)</label>
            <input
              type="number"
              id="price"
              className="w-full p-2 rounded-md transition-all ring-1 ring-primary/20 focus:ring-primary"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              required
            />
          </div>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <label className="block mb-2">Colors</label>
          <input
            id="colors"
            className="w-full p-2 rounded-md transition-all ring-1 ring-primary/20 focus:ring-primary"
            value={colors}
            onChange={(e) =>
              setColors(e.target.value.split(",").map((c) => c.trim()))
            }
            placeholder={"#FFEB3B, #FF9800, #F44336"}
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <label className="block mb-2">Sizes</label>
          <div className="flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "One Size"].map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={size}
                  checked={sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Sale */}
        <div className="mb-4 flex items-center gap-1">
          <input
            type="checkbox"
            id="sale"
            checked={sale}
            onChange={() => setSale(!sale)}
            className="mr-2"
          />
          <label htmlFor="sale">On Sale</label>
          {sale && (
            <input
              type="number"
              id="saleOff"
              className="ml-4 px-2 w-16 rounded-md"
              value={saleOff}
              onChange={(e) => setSaleOff(e.target.value)}
              placeholder="10"
            />
          )}
        </div>

        {/* BestSeller */}
        <div className="mb-4 flex items-center gap-1">
          <input
            type="checkbox"
            id="bestSeller"
            checked={bestSeller}
            onChange={() => setBestSeller(!bestSeller)}
            className="mr-2"
          />
          <label htmlFor="bestSeller">BestSeller</label>
        </div>

        {/* In Stock */}
        <div className="mb-4 flex items-center gap-1">
          <input
            type="checkbox"
            id="inStock"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
            className="mr-2"
          />
          <label htmlFor="inStock">In Stock</label>
        </div>

        {/* Feature */}
        <div className="mb-4 flex items-center gap-1">
          <input
            type="checkbox"
            id="feature"
            checked={feature}
            onChange={() => setFeature(!feature)}
            className="mr-2"
          />
          <label htmlFor="feature">Feature Product</label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition"
          >
            {loading ? "Adding product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
