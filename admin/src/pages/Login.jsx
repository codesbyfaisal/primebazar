import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/token.js";
import { toast } from "react-toastify";
import { ProductsContext } from "../context/ProductsContext";

const Login = () => {
  const { serverUrl,getOrderList,getProductsList } = useContext(ProductsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(1);
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(serverUrl + "/auth/user/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        toast.success(data.message);
        getProductsList();
        getOrderList();
        navigate("/");
      } else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong please try again letter");
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  return (
    <div className="px-[2vw] sm:px-[4vw] md:px-[6vw] flex justify-center items-center min-h-[90vh] bg-slate-50 col-span-full">
      <div className="w-full max-w-sm p-8 bg-white shadow-sm rounded-md">
        <h2 className="text-center text-3xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md outline-none ring-1 ring-primary/30 focus:ring-primary"
              placeholder="Enter your Email"
              required
              autoComplete="false"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md outline-none ring-1 ring-primary/30 focus:ring-primary"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
