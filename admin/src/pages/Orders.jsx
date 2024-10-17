import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { toast } from "react-toastify";
import { getToken } from "../utils/token.js";
import { assets } from "../assets/assets.js";

function Orders() {
  const { orderList, serverUrl } = useContext(ProductsContext);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Sorting function
  const sortOrders = (orders, key, direction) => {
    return [...orders].sort((a, b) => {
      if (key === "amount") {
        return direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else if (key === "date") {
        return direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (key === "orderId") {
        return direction === "asc"
          ? a.item?._id.localeCompare(b.item?._id)
          : b.item?._id.localeCompare(a.item?._id);
      }
      return 0;
    });
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(serverUrl + "/order/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: getToken(),
        },
        body: JSON.stringify({ orderId, newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Something went wrong: ${error.message || "Please try again later."}`
      );
    }
  };

  const sortedOrders = sortConfig.key
    ? sortOrders(orderList, sortConfig.key, sortConfig.direction)
    : orderList;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Orders List</h1>

      <div className="overflow-x-auto">
        {orderList.length === 0 ? (
          <p>There are no orders to show. Please place an order.</p>
        ) : (
          <div className="w-full min-w-[59rem]">
            {/* Orders Header */}
            <div className="grid grid-cols-[auto,repeat(12,minmax(0,1fr))] items-center py-2 gap-2 bg-primary/70 text-white font-medium rounded-md">
              <p className="px-2">#</p>
              <p
                className="col-span-3 cursor-pointer"
                onClick={() => handleSort("orderId")}
              >
                Order Id
                <img
                  src={assets.dropdown_icon}
                  className="w-2 aspect-square invert-[1]"
                />
              </p>
              <p>Image</p>
              <p className="col-span-3">Product Name</p>
              <p
                className="col-span-2 flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date
                <img
                  src={assets.dropdown_icon}
                  className="w-2 aspect-square invert-[1]"
                />
              </p>
              <p
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount
                <img
                  src={assets.dropdown_icon}
                  className="w-2 aspect-square invert-[1]"
                />
              </p>
              <p className="col-span-2">Status</p>
            </div>

            {/* Orders List */}
            {sortedOrders.map((order, index) => (
              <div
                key={order._id}
                className={`grid grid-cols-[auto,repeat(12,minmax(0,1fr))] items-center py-2 gap-4 border-b border-primary/30`}
              >
                <p className="px-2">{index + 1}</p>
                <p className="col-span-3">{order.item?._id}</p>
                <div>
                  <img
                    src={order.item?.image}
                    alt={order.item?.name || "Product Image"}
                    className="w-14 aspect-square"
                  />
                </div>
                <p className="py-2 col-span-3">{order.item?.name}</p>
                <p className="col-span-2">
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>{order.amount}</p>
                <select
                  name="status"
                  id="status"
                  className="p-1.5 cursor-pointer rounded-md bg-primary/20 capitalize col-span-2"
                  defaultValue={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="order placed">{order.status}</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                  <option value="on hold">On Hold</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;
