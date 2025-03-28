import React from "react";

function MainButton({ text, onclick }) {
  return (
    <button
      onClick={onclick}
      className=" 
   bg-gradient-to-r from-teal-700/20 to-cyan-700/50 border border-teal-500 text-white 
   px-6 max-lg:px-4 py-2 text-center rounded-[5px] w-[160px] max-lg:w-[140px] 
   shadow-lg transition-all duration-300 ease-in-out
  hover:shadow-[0px_0px_20px_0px_rgba(59,130,246,0.3),0px_0px_20px_5px_rgba(139,92,246,0.3)] 
   flex flex-row items-center justify-center gap-2 group"
    >
      <p className="font-alata text-[16px] max-sm:text-[13px] sm:max-lg:text-[15px]  text-white font-semibold hover:font-bold">
        {text}
      </p>
    </button>
  );
}

export default MainButton;
