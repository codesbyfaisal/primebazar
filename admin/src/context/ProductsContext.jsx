import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "../utils/token.js";

export const ProductsContext = createContext();

function ProductsContextProvider(props) {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const serverUrl = import.meta.env.VITE_BACKEND_URL;

  const getProductsList = async () => {
    setLoading(true);
    try {
      const response = await fetch(serverUrl + "/product/list");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setProductList(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Something went wrong: ${error.message || "Please try again later."}`
      );
    } finally {
      setLoading(false);
    }
  };

  const getOrderList = async () => {
    setLoading(true);
    try {
      const response = await fetch(serverUrl + "/order/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: getToken(),
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setOrderList(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Something went wrong: ${error.message || "Please try again later."}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getToken()) {
      getProductsList();
      getOrderList();
    }
  }, []);

  const value = {
    getOrderList,
    getProductsList,
    loading,
    productList,
    orderList,
    serverUrl,
  };

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;
