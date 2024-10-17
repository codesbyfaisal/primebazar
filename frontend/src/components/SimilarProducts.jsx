import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title, ProductCard } from "./index.js";

function SimilarProducts({ id, category, subcategory }) {
  const { products } = useContext(ShopContext);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (!category) return;
    if (products.length === 0) return;

    let productsCopy = products.slice();
    productsCopy = products.filter((product) => category === product.category);
    // productsCopy = productsCopy.filter(product => subcategory === product.subCategory)
    productsCopy = productsCopy.filter((product) => product._id !== id);
    productsCopy = productsCopy.slice(0, 4);

    setSimilarProducts(productsCopy);
  }, [category, subcategory, id]);

  if (similarProducts.length <= 0) return;

  return (
    <div>
      <Title text1="Related" text2="Products" line={true} />

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
        {similarProducts.map((product, index) => {
          return (
            <ProductCard
              key={index}
              id={product._id}
              images={product.images}
              name={product.name}
              price={product.price}
              sale={product.sale ? product.saleOff : product.sale}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SimilarProducts;
