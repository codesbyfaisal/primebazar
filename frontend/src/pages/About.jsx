import React from 'react';
import { NewsLatter, Title } from '../components';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] min-h-screen my-12">
      <div className="space-y-8">
        <Title text1="About" text2="Us" line={true} />

        {/* Company Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
          <div className='w-full space-y-4'>
            <p className="max-w-lg">
              We are a leading company in our industry, dedicated to providing top-notch products and services. Our mission is to deliver exceptional quality and exceed customer expectations.
            </p>
            <p className="max-w-lg">
              Founded in 2010, we have a team of passionate professionals committed to innovation and excellence. Our core values drive us to continuously improve and adapt in a rapidly changing world.
            </p>
          </div>

          <div className="w-full relative">
            <img src={assets.about_2_img} className='w-10/12 rounded-md' />
            <img src={assets.about_1_img} className='absolute top-1/2 left-1/3 w-2/3 rounded-md' />
          </div>
          <img src={assets.about_1_img} className='w-64' style={{visibility: 'hidden'}} />
        </div>

        <NewsLatter />

      </div>
    </section>
  )
};

export default About;