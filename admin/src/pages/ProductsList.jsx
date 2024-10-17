import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext.jsx";
import { assets } from "../assets/assets.js";
import { getToken } from "../utils/token.js";
import { toast } from "react-toastify";

function ProductsList() {
  const { productList, getProductsList, serverUrl } =
    useContext(ProductsContext);

  const removeItem = async (_id) => {
    return toast.warning("Removing Product is disable");
    try {
      const response = await fetch(serverUrl + "/product/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: getToken(),
        },
        body: JSON.stringify({ _id }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        getProductsList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product\nPlease Try again");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Products List</h1>

      {productList.length === 0 ? (
        <p>There are no products to show. Please add a product.</p>
      ) : (
        <div className="w-full">
          {/* Products List Header */}
          <div
            className={`grid grid-cols-[auto,minmax(4rem,auto),repeat(5,minmax(0,1fr))] items-center py-2 gap-4 bg-primary/70 text-white font-medium rounded-md`}
          >
            <p className="px-3">#</p>
            <p>Image</p>
            <p className="col-span-2">Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Delete</p>
          </div>

          {/* Product List */}
          {productList.map((product, index) => (
            <div
              key={product._id}
              className={`grid grid-cols-[auto,minmax(4rem,auto),repeat(5,minmax(0,1fr))] items-center py-2 gap-5 border-b border-primary/30`}
            >
              <p className="px-3">{index + 1}</p>
              <div>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 aspect-square"
                />
              </div>
              <p className="py-2 col-span-2">{product.name}</p>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <div className="py-2">
                <button
                  type="button"
                  className="flex items-center justify-center"
                  onClick={() => removeItem(product._id)}
                >
                  <img src={assets.bin_icon} alt="Delete" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductsList;
