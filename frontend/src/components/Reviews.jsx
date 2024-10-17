import { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "./index.js";
import { assets } from "../assets/assets.js";

function Reviews({ id }) {
  const { products } = useContext(ShopContext);
  const [showReviews, setShowReviews] = useState(1);

  const selectedProduct = useMemo(() => {
    return products.find((product) => id === product._id);
  }, [id, products]);

  const reviews = useMemo(() => {
    if (selectedProduct) {
      return selectedProduct.reviews.slice(0, showReviews);
    }
    return [];
  }, [selectedProduct, showReviews]);

  useEffect(() => {
    setShowReviews(1);
  }, [id]);

  return (
    <div className="text-sm mt-12">
      <Title text1="product" text2="reviews" line={true} />

      <div className="flex flex-wrap gap-4 my-4">
        {reviews.map((review) => (
          <div
            key={review.user_id}
            className="flex flex-col gap-4 flex-1 xs:min-w-[20rem] border border-black/10 p-4 max-w-[50%]"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={assets.profile_img}
                  className="w-7 h-7 text-center rounded-full"
                  alt="profile"
                ></img>
                <span>{review.username}</span>
              </div>

              <div className="flex p-1 gap-1">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon}
                    className="w-4 h-4"
                    alt="star"
                  ></img>
                ))}
              </div>
            </div>

            <div>{review.review}</div>

            <div className="flex justify-between">
              <span>{review.date}</span>
              <button className="p-1 px-2 hover border border-gray-950">
                Share
              </button>
            </div>
          </div>
        ))}

        <div className="w-full">
          {showReviews < selectedProduct.reviews.length && (
            <button
              className="w-max"
              onClick={() => setShowReviews(showReviews + 1)}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
