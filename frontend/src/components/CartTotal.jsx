import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function CartTotal() {
  const { currencySymbol, cartTotalPrice, deliveryFee } =
    useContext(ShopContext);

  return (
    <ul className="space-y-4">
      <li className="flex flex-wrap gap-4 text-base">
        Delivery Fee
        <span className="ml-auto font-bold">
          {currencySymbol}&nbsp;{cartTotalPrice() === 0 ? "0.00" : deliveryFee}
        </span>
      </li>
      <li className="flex flex-wrap gap-4 text-base">
        Products Cost
        <span className="ml-auto font-bold">
          {currencySymbol}&nbsp;{cartTotalPrice()}
        </span>
      </li>
      <li className="flex flex-wrap gap-4 text-2xl font-bold">
        Total
        <span className="ml-auto">
          {currencySymbol}&nbsp;
          <span>
            {cartTotalPrice() === 0
              ? "0.00"
              : (cartTotalPrice() + deliveryFee).toFixed(2)}
          </span>
        </span>
      </li>
    </ul>
  );
}

export default CartTotal;
