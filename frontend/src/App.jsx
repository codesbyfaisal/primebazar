import { useContext, useRef, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home, Login, Register, Product, Cart, Checkout, About, Contact, Products, Error404, Blogs, Blog, Orders, Faq, Profile } from './pages/index.js';
import { Footer, Loader, Navbar } from './components/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from './context/ShopContext.jsx';
import './App.css';
import PrivateRoute from './PrivateRoute';

function App() {
  const { products, isLoading } = useContext(ShopContext);
  const location = useLocation();
  const nodeRef = useRef();

  useEffect(() => {
    if (nodeRef.current) nodeRef.current.scrollTo(0, 0);
    else window.scrollTo(0, 0);

    if (location.pathname === '/') document.title = 'PrimeBazar';
    else {
      const pathName = location.pathname.split('/')[1];
      document.title = 'PrimeBazar - ' + pathName.charAt(0).toUpperCase() + pathName.slice(1);
    }
  }, [location.pathname, nodeRef]);

  if (!products || isLoading) {
    return <Loader />;
  }

  return (
    <div className='2xl:w-[1600px] 2xl:mx-auto 2xl:rounded-md 2xl:shadow-lg overflow-x-hidden relative w-full h-screen' ref={nodeRef}>
      <ToastContainer />
      <Navbar />
      <main className='relative min-h-screen'>
        <Routes location={location}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/user' element={<Navigate to='/user/profile' />} />

          {/* User Routes */}
          <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path='/user/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/user/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />

          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog' element={<Navigate to='/blogs' />} />
          <Route path='/blog/:blogId' element={<Blog />} />
          <Route path='/blogs/:blogId' element={<Navigate to='/blogs' />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/error' element={<Error404 />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;