import React from "react";

function Deals() {
  return (
    <section className="flex mt-12 rounded-md overflow-hidden md:gap-4">
      <div className="max-h-[200px]">
        <img
          src="https://150698241.v2.pressablecdn.com/fashion-gutenberg/wp-content/uploads/sites/225/2022/03/banner1.png"
          alt=""
          className="hidden md:block"
        />
      </div>
      <div className="max-h-[200px]">
        <img
          src="https://150698241.v2.pressablecdn.com/fashion-gutenberg/wp-content/uploads/sites/225/2022/03/banner3.png"
          alt=""
          className="w-full md:w-auto"
        />
      </div>
    </section>
  );
}

export default Deals;
