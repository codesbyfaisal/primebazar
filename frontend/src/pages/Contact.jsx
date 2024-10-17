import React from 'react';
import { Title } from '../components';
import { assets } from '../assets/assets';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    console.log(data);
  }
  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] my-12">
      <Title text1="Contact" text2="Us" line={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-4">
        <div className="flex items-center justify-center">
          <img src={assets.contact_img} alt="Contact Us" className="w-full" />
        </div>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <input type="text" id="name" name="name" required={true} autoComplete='off' className="w-full p-2 border border-gray-300 rounded outline-none bg-transparent focus:border-primary/70" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" required={true} autoComplete='off' className="w-full p-2 border border-gray-300 rounded outline-none bg-transparent focus:border-primary/70" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <textarea id="message" name="message" required={true} className="w-full p-2 border border-gray-300 rounded outline-none bg-transparent focus:border-primary/70" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-primary/70 text-white p-2 rounded hover:bg-primary">Send</button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
          <p className="mb-2"><strong>Telephone:</strong> +123 456 789</p>
          <p className="mb-2"><strong>Email:</strong> contact@example.com</p>
          <p><strong>Address:</strong> 123 Main Street, City, Country</p>
        </div>
        <div className="w-full h-64 bg-gray-200 rounded overflow-hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96771.88278146574!2d-74.15113207511726!3d40.71534532222189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250d225bfafdd%3A0x249f013a2cd25d9!2sJersey%20City%2C%20NJ%2C%20USA!5e0!3m2!1sen!2s!4v1726769706112!5m2!1sen!2s" width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
