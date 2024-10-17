import { useEffect, useState, useContext } from "react";
import { Title, ProductCard } from "./index.js";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function FeaturedCollection() {
  const { products } = useContext(ShopContext);
  const [featureProducts, setFeatureProducts] = useState([]);

  useEffect(() => {
    setFeatureProducts(
      products.filter((product) => product.feature === true).slice(0, 5)
    );
  }, [products]);

  return (
    <section className="mt-8 overflow-hidden">
      <div className="mt-8 mb-6 flex flex-col">
        <Title text1="featured" text2="products" line={true} />
        <Link to="/products" className="flex justify-end">
          Show more
        </Link>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xxs:px-4 xs:p-0">
        {featureProducts.map((product, index) => (
          <ProductCard
            key={index}
            id={product._id}
            images={product.images}
            name={product.name}
            price={product.price}
            sale={product.sale ? product.saleOff : product.sale}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCollection;
