import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import { getToken } from "./utils/token.js";
import {
  AddProduct,
  ProductsList,
  Dashboard,
  Orders,
  Login,
  Error404,
  Details,
} from "./pages/pages.js";

function App() {
  const [token, setToken] = useState(getToken());
  const location = useLocation();

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken !== token) setToken(storedToken);
  }, [location.pathname, token]);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center bg-white shadow-lg py-2">
        <Navbar />
      </nav>

      {/* Main Content */}
      <Routes location={location}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute token={token}>
              <div className="flex h-full">
                <aside className="bg-primary text-nowrap py-4 px-2">
                  <Sidebar />
                </aside>
                <main className="bg-[#ebebeb] flex-grow overflow-y-auto py-[1vw] px-[2vw]">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/all-products" element={<ProductsList />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="*" element={<Error404 />} />
                  </Routes>
                  <p style={{ visibility: "hidden" }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nihil maxime accusantium esse eligendi quas, facere, amet
                    perspiciatis maiores voluptate officiis, fugiat omnis
                    deleniti iure pariatur commodi obcaecati quidem ut aut hic
                    laborum soluta incidunt sed. Cumque officiis deleniti natus
                    aut excepturi. Temporibus quasi voluptatibus nam eveniet
                    tempore at modi incidunt.
                  </p>
                </main>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
