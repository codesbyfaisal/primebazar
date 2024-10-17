import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="px-[2vw] sm:px-[4vw] md:px-[6vw] xl:px-[8vw] bg-primary pb-2 text-sm">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-8">
        <ul className="space-y-1">
          <li className="text-white/90 text-lg font-bold my-2">Product</li>
          <li className="text-white/70 hover:text-white">
            <Link to="/products">Products</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/products">Categories</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/products">New Arrivals</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/products">Trending</Link>
          </li>
        </ul>

        <ul className="space-y-1">
          <li className="text-white/90 text-lg font-bold my-2">Company</li>
          <li className="text-white/70 hover:text-white">
            <Link to="/about">About Us</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/blogs">Blogs</Link>
          </li>
        </ul>

        <ul className="space-y-1">
          <li className="text-white/90 text-lg font-bold my-2">Help</li>
          <li className="text-white/70 hover:text-white">
            <Link to="/faq">FAQ</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <ul className="space-y-1">
          <li className="text-white/90 text-lg font-bold my-2">Account</li>
          <li className="text-white/70 hover:text-white">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/user/orders">Orders</Link>
          </li>
          <li className="text-white/70 hover:text-white">
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>

        <ul className="grid gap-2 [&>li]:flex [&>li]:gap-1 [&>li>span]:font-semibold space-y-1">
          <li className="text-white/90 text-lg font-bold my-2">Get in Touch</li>
          <li className="text-white/90">
            <span className="text-white/90">Email: </span>GxLqO@example.com
          </li>
          <li className="text-white/90">
            <span className="text-white/90">Telephone: </span>(123) 456-7890
          </li>
          <li className="text-white/90">
            <span className="text-white/90">Address: </span> 123 Main Street,
            Anytown, USA
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <Link to="/" className="w-8 opacity-70 hover:opacity-80">
          <img src={assets.facebook_icon} alt="Facebook" />
        </Link>
        <Link to="/" className="w-8 opacity-70 hover:opacity-80">
          <img src={assets.twitter_icon} alt="Twitter" />
        </Link>
        <Link to="/" className="w-8 opacity-70 hover:opacity-80">
          <img src={assets.instagram_icon} alt="Instagram" />
        </Link>
        <Link to="/" className="w-8 opacity-70 hover:opacity-80">
          <img src={assets.linkedin_icon} alt="Linkedin" />
        </Link>
      </div>

      <hr />

      <p className="mt-4 text-center font-normal">
        Copyright &copy; 2022. All rights reserved.
      </p>

      <p className="text-center font-normal">
        Powered by PrimeBazar & Crafted with ❤ by
        <a
          href="https://codebyfaisal.netlify.app"
          target="_blank"
          className="underline"
        >
          {" "}
          codebyfaisal
        </a>
      </p>
    </footer>
  );
}

export default Footer;
