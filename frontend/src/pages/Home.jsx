import React from 'react'
import { Hero, FeaturedCollection, TrendingNow, Deals, Policy, NewsLatter } from '../components/index.js'

const Home = () => {
  return (
    <>
      <Hero />
      <div className="px-[2vw] sm:px-[4vw] md:px-[6vw]">
        <Deals />
        <FeaturedCollection />
        <TrendingNow />
        <Policy />
        <NewsLatter />
      </div>
    </>
  )
}

export default Home
