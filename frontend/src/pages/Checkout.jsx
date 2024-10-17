import { useContext, useState } from "react";
import { Title, CartTotal } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext.jsx";
import Cookies from 'js-cookie';

const Checkout = () => {
  const { backendUrl, cartItems, cartTotalPrice, deliveryFee, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const inputStyle = "py-1.5 px-4 border border-black/10 my-1 w-full rounded-md focus:border-primary/70 outline-none bg-transparent"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      firstName,
      lastName,
      email,
      amount: cartTotalPrice(),
      deliveryFee,
      address: {
        street,
        city,
        state,
        zipcode,
        country
      },
      paymentMethod: paymentMethod,
      payment: false,
      items: cartItems
    };

    try {
      const cookieToken = Cookies.get('token');
      const response = await fetch(`${backendUrl}/order/place`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': cookieToken,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setCartItems([])
        navigate('/')
      } else toast.error(result.message);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing your order.");
    }
  };

  return (
    <form className="px-[2vw] sm:px-[4vw] md:px-[6vw] rounded-md flex justify-between flex-col gap-8 my-12 md:flex-row"
      onSubmit={handleSubmit}>
      {/* Form Header */}
      <div className="md:max-w-[38rem]">
        <Title text1={'Delivery'} text2={'Detials'} line={true} />

        <div className="my-7 bg-white p-6 rounded-md space-y-4">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium opacity-80">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="Tony"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${inputStyle} mt-1`}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium opacity-80">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Stark"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`${inputStyle} mt-1`}
                required={true}
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium opacity-80">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputStyle} mt-1`}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium opacity-80">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="+92 312 2023203"
                pattern="\+[0-9 ]{3,}"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    phone.endsWith('+') ? '' : '+' + e.target.value.replace(/[^0-9 ]/g, '')
                  )
                }
                maxLength={16}
                className={`${inputStyle} mt-1`}
                required={true}
                onBlur={() => phone.endsWith('+') ? setPhone('') : false}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="street" className="text-sm font-medium opacity-80">Street Address</label>
              <input
                id="street"
                type="text"
                placeholder="123 Street No."
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={`${inputStyle} mt-1`}
                required={true}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4">
              <div className="flex flex-col">
                <label htmlFor="city" className="text-sm font-medium opacity-80">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`${inputStyle} mt-1`}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="state" className="text-sm font-medium opacity-80">State</label>
                <input
                  id="state"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`${inputStyle} mt-1`}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="zipcode" className="text-sm font-medium opacity-80">Zipcode</label>
                <input
                  id="zipcode"
                  type="number"
                  placeholder="Zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className={`${inputStyle} mt-1`}
                  required={true}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="text-sm font-medium opacity-80">Country</label>
              <input
                id="country"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${inputStyle} mt-1`}
                required={true}
              />
            </div>
          </div>
        </div>

      </div>

      <div className="md:max-w-[35rem]">
        <Title text1={'Order'} text2={'Summary'} line={true} />

        <div className="space-y-4 my-7 bg-white p-6 rounded-md">
          {/* Order Summary */}
          <CartTotal />

          {/* Payment Method */}
          <p className="text-lg font-normal relative top-3">Payment Method</p>
          <div className="flex gap-2 flex-wrap [&>label]:flex [&>label]:items-center [&>label]:gap-1 [&>label]:border [&>label]:rounded-md [&>label]:px-4 [&>label]:py-2 [&>label]:cursor-pointer [&>label]:text-nowrap">
            <label htmlFor="payment-cdc">
              <input type="radio" name="payment" id="payment-cdc" value="Credit/Debit Card" required={true} onChange={(e) => setPaymentMethod(e.target.value)} disabled={true} /> Credit/Debit Card
            </label>
            <label htmlFor="payment-stripe">
              <input type="radio" name="payment" id="payment-stripe" value="Stripe" required={true} onChange={(e) => setPaymentMethod(e.target.value)} disabled={true} /> Stripe
            </label>
            <label htmlFor="payment-cod">
              <input type="radio" name="payment" id="payment-cod" value="Cash on Delivery" required={true} onChange={(e) => setPaymentMethod(e.target.value)} defaultChecked /> Cash on Delivery
            </label>
          </div>

          {/* Horizontal Links */}
          <div className="flex justify-between items-center">
            <Link to="#" className="text-primary underline">Return Policy</Link>
            <Link to="#" className="text-primary underline">Terms & Conditions</Link>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white rounded-md py-2 px-12"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;