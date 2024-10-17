import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Cookies from "js-cookie";

function Navbar() {
  const { cartItems, isAuthenticated } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login");
  };

  // Handle clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        event.stopPropagation();
        setOpen(false);
      }
    };
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleSearchBar = () => {
    setOpenSearch(!openSearch);
    navigate("/products");
  };

  return (
    <nav
      className="px-[2vw] sm:px-[4vw] md:px-[6vw] bg-[white] flex justify-between items-center gap-4 py-2 text-lg sticky top-0 z-[1000] font-medium"
      id="navbar"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={assets.logo}
          alt="PrimeBazar"
          className="min-w-[7rem] max-w-[7rem]"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden lg:flex items-center gap-6">
        {["home", "products", "blogs", "about", "contact"].map((link) => (
          <NavLink key={link} to={`/${link === "home" ? "" : link}`}>
            <p
              className="text-base uppercase"
              onClick={() => setOpenSearch(false)}
            >
              {link}
            </p>
            <hr className="w-2/3 border-none h-[2px] bg-primary opacity-0" />
          </NavLink>
        ))}
      </ul>

      {/* Icons and Login */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="min-w-4 max-w-4 cursor-pointer"
          onClick={toggleSearchBar}
        >
          <img src={assets.search_icon} alt="Search" />
        </button>

        <Link to={"/cart"} className="min-w-6 max-w-6 relative">
          <img src={assets.cart_icon} alt="Cart" />
          <p className="absolute top-[40%] left-[40%] w-5 h-5 bg-primary rounded-full text-white text-[12px] flex justify-center items-center">
            {!isAuthenticated() || cartItems.length === 0
              ? 0
              : cartItems.length}
          </p>
        </Link>

        <Link
          to="/login"
          className={`bg-secondary font-normal text-white px-4 py-1 rounded-3xl text-base ${
            isAuthenticated() ? "hidden" : ""
          }`}
        >
          Login
        </Link>

        {/* <select className='text-sm border-none outline-none cursor-pointer'>
          <option value="usd">USD</option>
          <option value="pkr">PKR</option>
        </select> */}

        <div
          className={`group relative fle flex-col items-center z-50 ${
            isAuthenticated() ? "" : "hidden"
          }`}
        >
          <button className="w-8 min-w-8 flex items-center p-1">
            <img
              src={assets.user_icon}
              alt="User"
              className="rounded-full invert"
            />
          </button>

          <div className="group-hover:block hidden absolute right-0 top-full dropdown-menu pt-3 font-normal">
            <div className="flex flex-col text-base bg-white shadow-lg rounded-md min-w-28 overflow-hidden [&>a]:block [&>a]:px-4 [&>a]:py-2">
              <Link
                to="/user/profile"
                className="text-center w-full hover:bg-primary/30"
              >
                Profile
              </Link>
              <Link
                to="/user/orders"
                className="text-center w-full hover:bg-primary/30"
              >
                Orders
              </Link>
              <hr className="w-full border-none h-[1px] bg-secondary/50" />
              <button
                type="button"
                className="w-full hover:bg-secondary hover:text-white font-medium px-4 py-2"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="Link-toggle min-w-5 max-w-5 lg:hidden w-full xs:w-auto"
        >
          <img
            src={assets.menu_icon}
            alt=""
            className={`${open ? "hidden" : "block"}`}
            onClick={() => setOpen(!open)}
          />
          <img
            src={assets.cross_icon}
            alt=""
            className={`scale-[1.2] ${open ? "block" : "hidden"}`}
            onClick={() => setOpen(!open)}
          />
        </button>

        {/* Mobile Menu */}
        <ul
          ref={menuRef}
          className={`lg:hidden ${
            open ? "grid" : "hidden"
          } bg-white absolute top-full left-0 w-full px-10 h-max rounded-md shadow-lg gap-4 py-4 justify-center`}
        >
          {["home", "products", "blogs", "about", "contact"].map((link) => (
            <NavLink
              key={link}
              to={`/${link === "home" ? "" : link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="flex flex-col justify-center items-center"
            >
              <p className="text-base uppercase text-center">{link}</p>
              <hr className="w-2/3 border-none h-[2px] bg-primary opacity-0" />
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
