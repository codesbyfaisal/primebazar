import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Error404() {
  const navigate = useNavigate()
  const location = useLocation()
  const { code, message, goback } = location.state || { code: 500, message: 'An unknown error occurred', goback: '/' };

  return (
    <section className='px-[2vw] sm:px-[4vw] md:px-[6vw] w-full h-screen flex justify-center items-center flex-col gap-6'>
      <div className="text-center text-2xl font-semibold">
        <h1 className="mb-2">Error</h1>
        <h1 className='text-primary font-bold text-6xl'>{code}</h1>
        <h2 className="mt-2 text-2xl max-w-xs">{message}</h2>
      </div>

      <div className='p-2 rounded-full bg-primary/20'>
        <button
          onClick={() => navigate(goback)}
          className='p-4 rounded-full bg-primary hover:bg-primary-dark transition duration-300'
        >
          <h1 className='text-xl font-bold text-white'>Go Back</h1>
        </button>
      </div>
    </section>
  )
}

export default Error404