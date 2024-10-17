import { createContext, useEffect, useState } from "react";
import { blogs } from "../assets/assets";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currencySymbol = "$";
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products from the backend
  const getProductsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/product/list`);
      const result = await response.json();
      setProducts(result.products);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch cart data from the backend
  const getCartData = async () => {
    const cookieToken = Cookies.get("token");
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: cookieToken,
        },
        body: JSON.stringify({}),
      });
      const result = await response.json();
      setCartItems(result.cartData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart items");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  };

  const isAuthenticated = () => {
    return !!Cookies.get("token");
  };

  // Update or add an item to the cart
  const updateAddToCart = async (updatedItem) => {
    const { _id, size, color, quantity } = updatedItem;

    const exist = cartItems.find(
      (item) => item._id === _id && item.size === size && item.color === color
    );
    if (exist && exist.quantity === quantity) return;

    const cookieToken = Cookies.get("token");

    try {
      const response = await fetch(`${backendUrl}/cart/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: cookieToken,
        },
        body: JSON.stringify({ updatedItem }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
      return;
    }

    setCartItems((prevCartItems) => {
      return prevCartItems
        .map((item) =>
          item._id === _id && item.size === size && item.color === color
            ? { ...item, quantity }
            : item
        )
        .concat(exist ? [] : [{ ...updatedItem, quantity }]);
    });
  };

  // Calculate total price of items in the cart
  const cartTotalPrice = () => {
    return parseFloat(
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
  };

  useEffect(() => {
    getProductsData();
    if (isAuthenticated()) getCartData();
  }, []);

  // Delete an item from the cart
  const deleteCartItem = async (_id, size, color) => {
    const cookieToken = Cookies.get("token");
    try {
      const response = await fetch(`${backendUrl}/cart/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: cookieToken,
        },
        body: JSON.stringify({ _id, size, color }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
      return;
    }

    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (item) =>
          !(item._id === _id && item.size === size && item.color === color)
      )
    );
  };

  const value = {
    products,
    getProductsData,
    getUserData,
    isLoading,
    currencySymbol,
    deliveryFee,
    cartTotalPrice,
    updateAddToCart,
    cartItems,
    blogs,
    backendUrl,
    isAuthenticated,
    deleteCartItem,
    getCartData,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
