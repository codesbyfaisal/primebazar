import React from "react";

function Title({ text1, text2, line }) {
  return (
    <div className="flex items-center gap-2 uppercase justify-center xs:justify-start">
      <div className="flex flex-col items-center xs:flex-row xs:items-end xs:gap-2 font-light">
        <h1 className="text-2xl md:text-3xl text-primary font-normal">
          {text1}
        </h1>
        <h1 className="text-3xl md:text-4xl">{text2}</h1>
      </div>

      {line ? (
        <div className="w-8 sm:w-16 h-[2px] rounded-md bg-black/60 hidden xs:block"></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Title;
