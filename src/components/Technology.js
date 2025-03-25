"use client";

import { firstLogo } from "@/constants/constants";
import { motion } from "framer-motion";
import React from "react";

export const Technology = () => {
  // Duplicate the logos to create a seamless loop
  const duplicatedLogos = [...firstLogo, ...firstLogo];

  return (
    <section
      className="2xl:h-[75vh] bg-stone-950 bg-contain bg-no-repeat bg-center max-sm:pt-5"
      style={
        {
          // backgroundImage: "url('assets/tech-bg2.png')",
        }
      }
    >
      <h2
        className="text-[100px] max-sm:text-[30px] max-md:text-[40px] md:max-lg:text-[50px] lg:max-xl:text-[80px] max-lg:mb-10 font-arsenal px-20 max-md:px-8 font-medium text-start"
        style={{
          textShadow: "5px 5px 5px rgb(110, 104, 104)",
        }}
      >
        Trusted Partners
      </h2>
      <div className=" top-0 flex overflow-hidden w-full">
        <motion.div
          className="flex flex-row items-center justify-center whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 100, // Slower animation
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }} // Optimize animation performance
        >
          {duplicatedLogos.map((item, index) => (
            <div
              key={index}
              className="text-2xl w-[220px] h-[150px] sm:max-md:w-[170px] sm:max-md:h-[100px] max-sm:w-[100px] max-sm:h-[70px]   mb-10 mx-[20px] backdrop-blur-lg border-[1px] border-white/50 bg-black/50 shadow-md shadow-indigo-950/60 rounded-xl justify-center items-center flex flex-row"
            >
              <div className=" w-[100px] h-[100px] max-sm:w-[50px] max-sm:h-[50px] sm:max-md:w-[50px] sm:max-md:h-[50px] flex items-center justify-center">
                {item.icon()}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="sticky top-0 flex overflow-hidden w-full">
        <motion.div
          className="flex flex-row items-center justify-center whitespace-nowrap"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            ease: "linear",
            duration: 100, // Slower animation
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }} // Optimize animation performance
        >
          {duplicatedLogos.map((item, index) => (
            <div
              key={index}
              className="text-2xl w-[220px] h-[150px] max-sm:w-[100px] max-sm:h-[70px] sm:max-md:w-[170px] sm:max-md:h-[100px] mb-10 mx-[20px] backdrop-blur-lg border-[1px] border-white/50 bg-black/50 shadow-md shadow-indigo-950/60 rounded-xl justify-center items-center flex flex-row"
            >
              <div className=" w-[100px] h-[100px] max-sm:w-[50px] max-sm:h-[50px] sm:max-md:w-[50px] sm:max-md:h-[50px] flex items-center justify-center ">
                {item.icon()}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
