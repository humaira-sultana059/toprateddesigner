"use client";
import { portfolio } from "@/constants/constants";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons

export default function Portfolio() {
  const [index, setIndex] = useState(0); // Selected portfolio index
  const [imageIndex, setImageIndex] = useState(0); // Selected image index
  const currentImages = portfolio[index].images; // Get images of the selected portfolio

  // Function to automatically cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % currentImages.length); // Loop through images
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentImages.length]);

  return (
    <div
      id="portfolio"
      className="w-full bg-gradient-to-b from-black via-fuchsia-900 to-black shadow-xl overflow-hidden flex flex-col items-center justify-center px-4 pb-16 max-sm:pb-6 sm:max-md:pb-10"
    >
      <p
        className="font-arsenal pt-[30px] text-[110px] max-sm:text-[30px] max-md:text-[40px] md:max-lg:text-[80px] max-lg:mb-10 mt-[10px] font-extrabold"
        style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
      >
        Recent
        <span
          className="font-arsenal text-[110px] max-sm:text-[30px] sm:max-md:text-[40px] md:max-lg:text-[80px] text-cyan-500 font-extrabold"
          style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
        >
          {" "}
          Works Flow
        </span>
      </p>
      {/* Portfolio display with fade transition */}
      <motion.div
        key={index} // Key ensures animation runs on change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex flex-col lg:flex-row items-center justify-center h-full w-full"
      >
        {/* Text div (1/3 of the width) */}
        <div className="h-full flex justify-center items-center pr-3 max-lg:pr-0 max-lg:mb-10 w-[27%] max-sm:w-[90%] sm:max-lg:w-[60%] lg:max-xl:w-[30%]">
          <div className="flex flex-col items-center text-black px-[30px] max-sm:px-[10px] bg-white py-5 rounded-[2px]">
            <div className="flex flex-col items-start">
              <p className="font-cardo text-[20px] mb-[-15px] font-semibold">
                {portfolio[index].type}
              </p>
              <p className="font-cardo text-[24px] max-md:text-[18px] md:max-xl:text-[18px] text-cyan-500 mt-4 font-bold border-b border-fuchsia-500 w-full uppercase">
                {portfolio[index].name}
              </p>
              <p className="font-jose text-[14px] text-stone-800 mt-[15px] font-medium text-justify leading-[20px] hyphens-auto">
                {portfolio[index].desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {portfolio[index].technologies.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-[6px] py-[2px] text-[12px] text-stone-800 border-[1px] border-fuchsia-500 rounded-full font-jose"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image div (2/3 of the width) - Fixed size & responsive */}
        <div className="flex items-center justify-center relative w-full max-w-[500px] md:max-w-[600px] lg:max-w-[50%] aspect-[16/9] px-3 backdrop-blur-lg border border-white/10 bg-black/30 py-5 rounded-lg lg:ml-10 shadow-cyan-400/50 shadow-md">
          {/* Image with fade effect */}
          <motion.img
            key={imageIndex} // Re-renders on image change for animation
            src={currentImages[imageIndex]}
            alt={`Portfolio Image ${imageIndex + 1}`}
            className="w-full h-full object-contain rounded-lg py-3 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Image icons section */}
      <div className="w-full flex justify-center gap-4 py-3 px-6 my-5">
        {portfolio.map((item, i) => (
          <img
            key={i}
            src={item.images[0]}
            alt={item.name}
            className={`w-16 h-16 max-sm:w-10 max-sm:h-10 object-contain cursor-pointer border-2 rounded-md transition-all duration-300 ${
              index === i ? "border-[#3299a8] scale-110" : "border-gray-300"
            }`}
            onClick={() => {
              if (index !== i) {
                // Avoid unnecessary state updates
                setIndex(i);
                setImageIndex(0); // Reset to first image when switching portfolio
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
