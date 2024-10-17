import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductCard({ id, images, name, price, sale }) {
  const { currencySymbol } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm"
    >
      <div key={id} className="relative">
        {/* Product Image */}
        <div className="relative overflow-hidden w-full h-64">
          <img
            src={images[0]}
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100"
          />
          <img
            src={images[1] ? images[1] : images[0]} // Fallback if no second image
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h1 className="text-lg font-medium truncate group-hover:text-primary transition-colors duration-300">
            {name}
          </h1>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-xl font-semibold">
              <span className="text-sm">{currencySymbol} </span>
              {price}
            </h1>
            {sale && (
              <span className="text-xs text-primary font-medium bg-red-50 px-2 py-1 rounded">
                {`${sale}% OFF`}
              </span>
            )}
          </div>
        </div>

        {/* Discount Badge */}
        {sale && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            Sale
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
