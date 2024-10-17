import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-16 w-16 bg-secondary animate-ping"></div>
    </div>
  );
}

export default Loader;
