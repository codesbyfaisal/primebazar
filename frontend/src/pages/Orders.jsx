import React, { useContext, useState, useEffect } from 'react';
import { Title } from '../components/index.js';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from 'react-toastify';

const getStatusColor = (status) => {
  switch (status) {
    case 'order placed':
      return 'bg-blue-600';
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-orange-500';
    case 'shipped':
      return 'bg-purple-600';
    case 'delivered':
      return 'bg-green-600';
    case 'cancelled':
      return 'bg-red-600';
    case 'refunded':
      return 'bg-gray-600';
    case 'on hold':
      return 'bg-yellow-600';
    case 'failed':
      return 'bg-red-800';
    default:
      return 'bg-gray-400';
  }
};

const OrderItem = ({ order }) => {
  const { backendUrl } = useContext(ShopContext)
  const { _id, amount, status, date, quantity, item } = order;

  const cancelOrder = async (orderId) => {
    try {
      const cookieToken = Cookies.get('token');
      const response = await fetch(`${backendUrl}/order/cancel`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': cookieToken,
        },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while cancelling your order.");
    }
  }

  return (
    <div className="bg-white/40 rounded-md overflow-hidden">
      <div className="flex flex-wrap justify-between p-4 bg-primary/20">    

        <div>
          <h5 className="font-normal">Order ID:
            <span className='font-semibold'>{_id}</span>
          </h5>
          <p className="text-sm">Date: {new Date(date).toLocaleDateString()}</p>
        </div>

        <div className="text-right mt-2 sm:mt-0">
          <p className="font-semibold">${amount.toFixed(2)}</p>
          <p className={`text-sm font-medium text-white rounded-lg text-center px-2 ${getStatusColor(status)}`}>{status}</p>
        </div>
      </div>

      <div className="flex gap-4 p-4 flex-wrap xs:flex-nowrap">
        <img src={item.image} className="w-16 h-16 rounded-md" alt={item.name} />

        <div className="flex-grow text-sm">
          <h6 className="text-lg font-medium">{item.name}</h6>
          <p className="flex items-center gap-2">
            Color: <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></span>
          </p>
          <span>Size: {item.size}</span>
        </div>

        <div className="w-full flex justify-between gap-4 text-right xs:w-auto xs:block">
          <p className="font-normal">${item.price}</p>
          <p>Quantity: {quantity}</p>
          <Link to={"/product/" + item._id} className="text-indigo-600 hover:underline text-sm">View Product</Link>
        </div>
      </div>

      <div className="text-right pr-4 pb-4">
        <button className={`border border-red-400 text-red-500 py-2 px-4 rounded-md text-sm transition-all ${status === 'cancelled' ? '' : 'hover:text-white hover:bg-red-500'}`}
          onClick={() => cancelOrder(_id)}
          disabled={status === 'cancelled' ? true : false}
        >
          {status === 'cancelled' ? 'X Cancelled' : 'Cancel Order'}
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { backendUrl } = useContext(ShopContext)

  const getOrdersData = async () => {
    try {
      const cookieToken = Cookies.get('token');
      const response = await fetch(`${backendUrl}/order/userorders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': cookieToken,
        },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      setOrderHistory(result.orders)
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing your order.");
    }
  }

  useEffect(() => {
    getOrdersData()
  }, [])

  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] my-12" >
      <Title text1="Orders" text2="History" line={true} />
      <p className="mb-8 text-sm md:text-base text-primary">
        Check the status of your recent orders.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {orderHistory.length < 1 ? <h1>You have'nt any orders yet</h1> : orderHistory.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </div>
    </section>
  );
}

export default Orders;