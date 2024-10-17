import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";
import { Title, ProductCard } from "./index.js";

function TrendingNow() {
  const { products } = useContext(ShopContext);
  const [trendingNow, setTrendingNow] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setTrendingNow(
        products.filter((product) => product.bestSeller === true).slice(0, 5)
      );
    }
  }, [products]);

  return (
    <section className="mt-8 overflow-hidden">
      <div className="my-8">
        <Title text1="Trending" text2="now" line={true} />
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xxs:px-4 xs:p-0">
        {trendingNow.map((product, index) => (
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

      <Link to="/products" className="flex justify-center my-10"></Link>
    </section>
  );
}

export default TrendingNow;
