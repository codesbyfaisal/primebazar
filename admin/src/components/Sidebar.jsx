import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function Sidebar() {
  const [showLabel, setShowLabel] = useState();

  return (
    <nav className="flex flex-col space-y-4 bg-primary">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex justify-center md:justify-start items-center gap-2 p-2 rounded-md transition duration-300 text-white
          ${isActive ? "bg-secondary/40" : ""}`
        }
      >
        <img
          src={assets.dashboard_icon}
          alt="Dashboard"
          className="w-7 min-w-7"
          onDoubleClick={() => setShowLabel(!showLabel)}
        />
        <span
          className={showLabel ? "" : "hidden"}
          onDoubleClick={() => setShowLabel(!showLabel)}
        >
          Dashboard
        </span>
      </NavLink>

      <NavLink
        to="/add-product"
        className={({ isActive }) =>
          `flex justify-center md:justify-start items-center gap-2 p-2 rounded-md transition duration-300 text-white
          ${isActive ? "bg-secondary/40" : ""}`
        }
      >
        <img
          src={assets.addProduct_icon}
          alt="Add Product"
          className="w-7 min-w-7"
          onDoubleClick={() => setShowLabel(!showLabel)}
        />
        <span
          className={showLabel ? "" : "hidden"}
          onDoubleClick={() => setShowLabel(!showLabel)}
        >
          Add Product
        </span>
      </NavLink>

      <NavLink
        to="/all-products"
        className={({ isActive }) =>
          `flex justify-center md:justify-start items-center gap-2 p-2 rounded-md transition duration-300 text-white
          ${isActive ? "bg-secondary/40" : ""}`
        }
      >
        <img
          src={assets.products_icon}
          alt="All Products"
          className="w-7 min-w-7"
          onDoubleClick={() => setShowLabel(!showLabel)}
        />
        <span
          className={showLabel ? "" : "hidden"}
          onDoubleClick={() => setShowLabel(!showLabel)}
        >
          Products List
        </span>
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex justify-center md:justify-start items-center gap-2 p-2 rounded-md transition duration-300 text-white
          ${isActive ? "bg-secondary/40" : ""}`
        }
      >
        <img
          src={assets.orders_icon}
          alt="Orders"
          className="w-7 min-w-7"
          onDoubleClick={() => setShowLabel(!showLabel)}
        />
        <span
          className={showLabel ? "" : "hidden"}
          onDoubleClick={() => setShowLabel(!showLabel)}
        >
          Orders
        </span>
      </NavLink>

      <NavLink
        to="/comments"
        className={({ isActive }) =>
          `fle justify-center md:justify-start items-center gap-2 p-2 rounded-md transition duration-300 text-white hidden
          ${isActive ? "bg-secondary/40" : ""}`
        }
      >
        <img
          src={assets.comments_icon}
          alt="Comments"
          className="w-7 min-w-7"
          onDoubleClick={() => setShowLabel(!showLabel)}
        />
        <span
          className={showLabel ? "" : "hidden"}
          onDoubleClick={() => setShowLabel(!showLabel)}
        >
          Comments
        </span>
      </NavLink>

      <NavLink
        to="/details"
        className={({ isActive }) =>
          `fle justify-center md:justify-start items-center gap-2 p-2 rounded-md transition duration-300 text-white hidden
          ${isActive ? "bg-secondary/40" : ""}`
        }
      >
        <img
          src={assets.details_icon}
          alt="details"
          className="w-7 min-w-7"
          onDoubleClick={() => setShowLabel(!showLabel)}
        />
        <span
          className={showLabel ? "" : "hidden"}
          onDoubleClick={() => setShowLabel(!showLabel)}
        >
          Details
        </span>
      </NavLink>
    </nav>
  );
}

export default Sidebar;
