"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { navMenu, services, socialMedia, terms } from "@/constants/constants";
import MainButton from "./MainButton";

export default function Footer({ setIsModalOpen }) {
  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full  bg-zinc-950  flex flex-col py-10 ">
      {/* Top Section */}
      {/* <p className="font-cardo text-[70px] sm:max-lg:text-[45px] max-sm:text-[25px] font-normal text-start bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-7">
        Let's Design Your Dream!
      </p> */}
      <div className="flex flex-row max-md:flex-col md:items-center md:justify-between px-24 md:max-lg:px-10 max-md:px-5">
        {/* Introduction */}
        <div className="flex flex-col max-md:items-center max-md:w-full max-md:mb-10">
          <img
            src="assets/logo-2.svg"
            className=" w-[220px] h-[120px] mt-[-50px]"
            onClick={() => handleNavClick("home")}
          />
          <p className="w-[300px] md:max-lg:w-[200px] max-md:w-full font-lato text-[12px] text-justify text-white/60">
            Empowering Ideas, Crafting Innovation. At TOP RATED DESIGNER, we
            turn visions into reality through cutting-edge code and creative
            solutions. Let's shape the future together—one line of code at a
            time!
          </p>
        </div>
        {/* Terms & conditions */}
        <div>
          <h2 className="pb-1 text-[18px] md:max-lg:text-[15px] text-white/90 font-lato font-bold">
            Terms & Conditions
          </h2>
          <div>
            {terms.map((item, index) => (
              <p
                key={index}
                className="text-[13px] font-lato font-medium text-white/60 my-2 "
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        {/* Services */}
        <div>
          <h2 className="pb-1 text-[18px]  md:max-lg:text-[15px] text-white/90 font-lato font-bold">
            Our Expertise
          </h2>
          <div>
            {services.map((item, index) => (
              <div
                key={index}
                className="text-[13px] font-lato font-medium text-white/60 my-2 cursor-pointer"
              >
                <p onClick={() => handleNavClick("services")}>
                  {item.nick_name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Contact */}
        <div className="flex flex-col">
          <MainButton
            text={"Connect Us"}
            onclick={() => {
              setIsModalOpen(true);
            }}
          />
          <div className="text-[15px]  mt-8 max-md:mt-5  font-lato text-stone-200/60">
            <p className="mt-2">
              <i className="fa-solid fa-location-dot text-[14px] mr-2"></i>{" "}
              Chittagong, Bangladesh
            </p>
            <p className="mt-2">
              <i className="fa-solid fa-envelope text-[14px] mr-2"></i>{" "}
              hello@toprateddesigner.com
            </p>
            <p className="mt-2">
              <i className="fa-solid fa-phone text-[14px] mr-2"></i>
              +8801799008100
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Copyright Text & social media */}
      <div className="flex flex-row md:mt-10 max-md:mt-4 max-md:flex-col border-t border-t-gray-600/50 pt-4 max-md:pt-2">
        <div className=" flex flex-row max-md:flex-col w-full items-center justify-between mb-5  px-[50px] max-sm:px-4">
          <p className="text-white text-start font-jose font-semibold text-[13px] max-sm:text-[10px] max-md:mt-5">
            © 2025 Top Rated Designer. All Rights Reserved.
          </p>
          <div className="flex flex-row justify-center">
            {socialMedia.map((item, index) => (
              <div
                key={index}
                className="w-[40px] h-[40px] mx-2 max-sm:mx-1 flex items-center justify-center text-white/60 transition-all duration-500 hover:text-stone-950 hover:bg-white hover:rounded-full cursor-pointer text-[20px]"
              >
                {item.icon()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
