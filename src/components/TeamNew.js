"use client";
import { team } from "@/constants/constants";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function TeamNew() {
  const [index, setIndex] = useState(0);
  const totalItems = team.length;
  const duplicatedTeam = [...team, ...team, ...team]; // Duplicate the team array

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalItems);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalItems]);

  return (
    <div
      id="team"
      className="w-full h-auto flex flex-col items-center justify-center bg-black bg-contain bg-no-repeat bg-center px-24  max-sm:px-3 sm:max-lg:px-10 relative overflow-hidden "
      style={{
        backgroundImage: "url('assets/shadow-2.png')",
      }}
    >
      <p
        className="font-arsenal pt-[30px] text-[110px] max-sm:text-[27px] max-md:text-[40px] md:max-lg:text-[80px] max-sm:mb-0 sm:max-md:mb-2 md:max-lg:mb-10 mt-[10px] font-extrabold"
        style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
      >
        Your Technical
        <span
          className="font-arsenal text-[110px] max-sm:text-[27px] max-md:text-[40px] md:max-lg:text-[80px] max-sm:mb-0  sm:max-md:mb-2 md:max-lg:mb-10 text-cyan-500 font-extrabold"
          style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
        >
          {" "}
          Experts
        </span>
      </p>
      <div className="flex w-full  max-sm:h-[65vh] sm:max-md:h-[65vh] md:max-lg:h-[50vh] lg:h-[80vh] justify-center items-center relative overflow-hidden">
        <motion.div
          className="flex flex-row gap-6 max-sm:gap-[60px] w-full"
          initial={{ x: 0 }}
          animate={{ x: -index * 280 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ display: "flex", width: "max-content" }}
        >
          {duplicatedTeam.map((item, i) => {
            const position = (i - index + totalItems) % totalItems;
            const isCenter = position === 2;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isCenter ? 1.2 : 0.9,
                  opacity: position < 3 ? 1 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-lg border border-white/80 bg-black/60 py-4 px-4 max-sm:px-1 w-[250px]  max-sm:w-[220px] h-[340px]  flex-shrink-0"
              >
                <div className="flex flex-row justify-center">
                  <img
                    src={item.image}
                    className="w-[100px] h-[110px] shadow-md object-cover border-[1px] border-cyan-400 rounded-[4px]"
                  />
                </div>
                <div className="mt-[20px] text-center">
                  <p className="text-[20px]  font-bold">{item.name}</p>
                  <p className="text-[13px] text-gray-300">{item.position}</p>
                  <p className="text-[10px] text-gray-400">
                    {item.experience} of experience
                  </p>
                </div>
                {/* Expertise Technologies */}
                <div className="mt-4">
                  <p className="text-[16px] text-emerald-400 font-bold font-jose mb-2 text-center">
                    Expertise Technologies
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {item.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-[6px] py-[2px] text-[12px] text-stone-200 border-[1px] border-cyan-400 rounded-full"
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default TeamNew;
