import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Title } from '../components/index.js';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Profile = () => {
  const { getUserData, backendUrl, isAuthenticated, getCartData } = useContext(ShopContext);
  const { username, useremail } = getUserData();
  const navigate = useNavigate()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [password, setPassword] = useState('')

  const deleteAccount = async (e, email) => {
    e.preventDefault()

    try {
      const response = await fetch(`${backendUrl}/auth/user/delete`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.success) {
        Cookies.remove('token')
        Cookies.remove('user')
        toast.success(result.message);
        if (isAuthenticated()) getCartData()
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting your Account.");
    }
  }

  return (
    <section className='px-[2vw] sm:px-[4vw] md:px-[6vw] space-y-6 my-12 mx-auto xs:max-w-xl relative'>

      {/* Popup */}
      {
        isPopupOpen ? <div className="bg-white h-full w-full absolute left-0 top-0 flex items-center justify-center text-center">
          <form className="p-6 max-w-sm w-full"
            onSubmit={(e) => deleteAccount(e, useremail)}
          >
            <h1 className="text-2xl font-semibold mb-4">
              Are you sure you want to delete your account?
            </h1>
            <p className="mb-2">
              This action is irreversible. Once deleted, all your data including cart and orders will be permanently removed from PrimeBazar's servers.
            </p>
            <div className="my-8">
              <label htmlFor="password" className="block font-medium text-left">
                Confirm with your password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm outline-none ring-1 ring-primary/30 focus:ring-primary sm:text-sm"
                placeholder="Password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none" type='submit'>
                Delete Account
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded-md shadow hover:bg-gray-300 focus:outline-none"
                onClick={() => setIsPopupOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div> : ''
      }


      <Title text1="User" text2="Profile" line={true} />

      <div className="flex flex-col items-center gap-6">
        <div className="w-24 aspect-square bg-primary p-4 rounded-full overflow-hidden">
          <img src={assets.user_icon} alt="User Profile" className="w-full h-full object-cover" />
        </div>

        <div className="grid gap-6 w-full">
          <div className="space-y-1">
            <p className='text-secondary/80 text-sm'>Name</p>
            <h1 className="text-lg font-light px-2 border border-primary/70 py-1 rounded-sm">{username}</h1>
          </div>
          <div className="space-y-1">
            <p className='text-secondary/80 text-sm'>Email</p>
            <h1 className="text-lg font-light px-2 border border-primary/70 py-1 rounded-sm">{useremail}</h1>
          </div>
        </div>

        <Link
          to={'/products'}
          className='flex-1 p-3 bg-primary text-white rounded-md hover:bg-secondary/80 transition duration-300 ease-in-out text-center w-full'
        >Continue Shopping
        </Link>

        <button
          className='flex-1 p-3 ring-1 ring-inset ring-red-500 text-red-600 font-normal rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out text-center w-full'
          aria-label="Delete Account"
          onClick={() => setIsPopupOpen(true)}
        >Delete Account
        </button>
      </div>
    </section>
  );
};

export default Profile;