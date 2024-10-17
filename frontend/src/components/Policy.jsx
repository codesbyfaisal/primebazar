import React from "react";
import { assets } from "../assets/assets";

function Policy() {
  return (
    <section className="flex justify-center gap-4 mb-12 text-center flex-wrap">
      <div className="rounded-md min-w-64 max-w-72 p-4 grid justify-items-center gap-2">
        <div className="w-8 sm:w-14">
          <img src={assets.support_img} alt="suppor" />
        </div>
        <h1 className="text-xl">24/7 Customer Service</h1>
        <p>We're here to help anytime with round-the-clock support.</p>
      </div>

      <div className="rounded-md min-w-64 max-w-72 p-4 grid justify-items-center gap-2">
        <div className="w-8 sm:w-14">
          <img src={assets.exchange_icon} alt="exchange" />
        </div>
        <h1 className="text-xl">Simple Exchange Process</h1>
        <p>Enjoy a seamless and easy exchange experience with us.</p>
      </div>

      <div className="rounded-md min-w-64 max-w-72 p-4 grid justify-items-center gap-2">
        <div className="w-8 sm:w-14">
          <img src={assets.quality_icon} alt="quality" />
        </div>
        <h1 className="text-xl">7-Day Free Returns</h1>
        <p>Benefit from our no-cost 7-day return policy.</p>
      </div>
    </section>
  );
}

export default Policy;
