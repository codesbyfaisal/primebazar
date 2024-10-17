import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../components/index.js';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    try {
      const response = await fetch(backen+'/auth/user/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setIsRegister(true)
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        toast.error(result.message);
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegister) return <Loader />

  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] flex justify-center items-center min-h-[90vh]">
      <div className="w-full max-w-sm p-8 bg-white shadow-sm rounded-md">
        <h2 className="text-center text-3xl font-bold mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-primary"
              placeholder="Username"
              required={true}
              autoCapitalize='false'
            />
          </div>

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
              autoCapitalize='false'
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
              {isSubmitting ? 'Register ...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-8">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register