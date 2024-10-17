import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const Dashboard = () => {
  const { productList, loading, orderList } = useContext(ProductsContext);

  return (
    <div className="bg-[#ebebeb]">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Total Products</h2>
          <p className="text-4xl text-blue-600">
            {loading ? "Loading..." : productList ? productList.length : 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
          <p className="text-4xl text-green-600">{orderList.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          {orderList.length === 0 ? (
            <p>There are no orders to show. Please place an order.</p>
          ) : (
            <div className="w-full min-w-[59rem]">
              {/* Orders Header */}
              <div className="grid grid-cols-[auto,repeat(12,minmax(0,1fr))] items-center py-2 gap-2 bg-primary/70 text-white font-medium rounded-md">
                <p className="px-2">#</p>
                <p className="col-span-3">Order Id</p>
                <p>Image</p>
                <p className="col-span-3">Product Name</p>
                <p className="col-span-2">Date</p>
                <p>Amount</p>
                <p className="col-span-2">Status</p>
              </div>

              {/* Orders List */}
              {orderList.slice(0, 7).map((order, index) => (
                <div
                  key={order._id} // Use unique key for order
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
                  <p className="col-span-2">{order.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
