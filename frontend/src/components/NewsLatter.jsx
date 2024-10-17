import React, { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section className="flex h-full justify-center items-center bg-primary my-10 rounded-md">
      <div className="p-6">
        <div className="flex flex-wrap items-center w-full max-w-5xl p-5 mx-auto text-left border border-gray-200 rounded lg:flex-nowrap md:p-8">
          <div className="flex-1 w-full mb-5 md:mb-0 md:pr-5 lg:pr-10 md:w-1/2">
            <h3 className="mb-2 text-2xl font-bold text-white/90">
              Subscribe to Newsletter
            </h3>
            <p className="text-white/70">
              Provide your email to get email notifications when we launch new
              products or publish new post.
            </p>
            <h3 className="font-normal underline text-lg mt-5">
              Subscribe now & get 20% off
            </h3>
          </div>
          <div className="w-full px-1 flex-0 md:w-auto lg:w-1/2">
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-y-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-3 py-4 placeholder-opacity-30 border sm:mr-1 outline-none focus:border-primary rounded-md sm:rounded-none sm:rounded-s-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="false"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-2 sm:py-3 text-white text-lg bg-secondary rounded-md sm:rounded-none hover:bg-secondary/60 sm:mt-0 sm:w-auto whitespace-nowrap sm:rounded-e-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
