import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Login = () => {
  const { getCartData, isAuthenticated, backendUrl
  } = useContext(ShopContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(backendUrl + '/auth/user/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.success) {
        Cookies.set('token', data.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
        toast.success(data.message)
        navigate('/')
      }
      else toast.error(data.message)
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong please try again letter')
    } finally {
      if (isAuthenticated()) getCartData()
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) navigate('/');
  }, [navigate]);

  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] flex justify-center items-center min-h-[90vh]">
      <div className="w-full max-w-sm p-8 bg-white shadow-sm rounded-md">
        <h2 className="text-center text-3xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-primary"
              placeholder="Email"
              required={true}
              autoComplete='false'
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-primary"
              placeholder="Password"
              required={true}
            />
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80">
              {isSubmitting ? 'Login ...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-8">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;