import { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title, CartTotal } from '../components/index.js';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';


function Cart() {
  const { currencySymbol, updateAddToCart, cartItems, deleteCartItem } = useContext(ShopContext)

  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] my-12">
      <Title text1="Cart" text2="" line={true} />

      <div className="lg:grid lg:grid-cols-10 gap-4">

        <div className="col-span-7">
          <hr className="border-primary/50 mt-4 mb-8" />

          {
            cartItems.length < 1 ? <p>You have not added any products to the cart yet</p> :
              <div className="space-y-4">
                {
                  cartItems.map((product, index) => (
                    <div key={index} className="flex py-1 border-b w-full sm:max-w-[40rem]">
                      <div className="w-20 aspect-square mr-2">
                        <img
                          src={product.image}
                          alt={`Image of ${product.name}`}
                          className='h-full w-full rounded-md'
                          onError={(e) => e.target.src = 'fallback-image-url.jpg'}
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex justify-between items-center gap-4">
                          <h1 className='text-lg font-normal'>{product.name}</h1>
                          <img
                            src={assets.bin_icon}
                            className='w-5 h-5 cursor-pointer'
                            aria-label="Remove product"
                            onClick={() => deleteCartItem(product._id, product.size, product.color)}
                          />
                        </div>

                        <div className="flex justify-between items-end gap-4">
                          <div className="flex items-center gap-4">
                            <span className='border border-primary w-6 h-6 flex justify-center items-center'>{product.size}</span>
                            <span style={{ backgroundColor: product.color }} className='w-6 h-6 rounded-full shadow-md border border-primary/70'></span>
                            <input
                              type="number"
                              className='px-2 py-1 border-none outline-none max-w-16 rounded-md bg-primary/20 mt-1 font-normal'
                              value={product.quantity}
                              onChange={(e) => updateAddToCart({ ...product, quantity: parseInt(e.target.value) })}
                              id={"input" + Math.random()}
                            />
                          </div>
                          <h3 className='font-normal'>{currencySymbol} {product.price}</h3>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
          }
        </div>

        <div className="col-span-3 mt-4 bg-white p-4 rounded-md sm:min-w-[20rem] space-y-2 h-max">
          <CartTotal />
          <Link to={'/checkout'} className="px-4 py-2.5 w-full font-semibold tracking-wide bg-primary/80 hover:bg-primary text-white rounded-md block text-center">Checkout</Link>
          <Link to={'/products'} className="px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent border border-gray-300 rounded-md block text-center">Continue Shopping  </Link>
        </div>

      </div>
    </section>
  )
}

export default Cart