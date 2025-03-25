"use client";
import { services } from "@/constants/constants";
import React, { useState } from "react";
import ServiceModal from "./ServiceModal";

const gradientShadows = [
  "from-blue-500 via-green-400 to-transparent",
  "from-purple-500 via-pink-400 to-transparent",
  "from-lime-500 via-blue-400 to-transparent",
  "from-teal-500 via-cyan-400 to-transparent",
  "from-yellow-500 via-red-400 to-transparent",
  "from-indigo-500 via-blue-400 to-transparent",
  "from-pink-500 via-purple-400 to-transparent",
  "from-red-500 via-orange-400 to-transparent",
  "from-gray-500 via-gray-300 to-transparent",
];

const DrawOutlineButton = ({
  children,
  gradientClass,
  setShowModal,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className="group relative font-medium text-slate-100 transition-colors duration-[400ms] hover:text-white overflow-hidden rounded-md"
      onClick={setShowModal}
    >
      <span className="z-[4]">{children}</span>

      {/* Gradient Shadow */}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[64%] h-[80px] bg-gradient-to-b ${gradientClass} opacity-50 transition-opacity duration-300 group-hover:opacity-50 blur-md clip-path-[ellipse(80%_60%_at_50%_100%)] rounded-[1000px] scale-150 z-[1]`}
      />

      {/* Borders */}
      <span className="absolute left-0 top-0 h-[1px] w-0 bg-lime-200 transition-all duration-300 group-hover:w-full" />
      <span className="absolute right-0 top-0 h-0 w-[1px] bg-lime-200 transition-all delay-100 duration-300 group-hover:h-full" />
      <span className="absolute bottom-0 right-0 h-[1px] w-0 bg-lime-200 transition-all delay-200 duration-300 group-hover:w-full" />
      <span className="absolute bottom-0 left-0 h-0 w-[1px] bg-lime-200 transition-all delay-300 duration-300 group-hover:h-full" />
    </button>
  );
};

export default function MiddleCont() {
  const [showmodal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  return (
    <div
      id="services"
      className="h-auto w-full bg-stone-950 bg-cover  pt-5 pb-16"
    >
      <h2
        className="flex flex-row font-arsenal font-medium text-[110px] max-md:text-[30px] md:max-xl:text-[70px] ml-20 max-md:ml-5 "
        style={{ textShadow: "5px 5px 5px rgb(110, 104, 104)" }}
      >
        Like What We Do
      </h2>
      <div className="flex flex-wrap justify-center mt-10 gap-10">
        {services.map((item, index) => (
          <DrawOutlineButton
            key={index}
            gradientClass={gradientShadows[index % gradientShadows.length]}
            setShowModal={() => {
              setSelectedService(item);
              setShowModal(true);
            }}
          >
            <div className="group relative min-h-[270px] p-4 w-[380px] max-sm:w-[280px] rounded-[4px] bg-teal-200 bg-opacity-10 backdrop-blur-lg border border-teal-900 border-opacity-20 flex flex-col items-center justify-center transition-all duration-300">
              <div className="text-2xl mb-2 w-[20px], h-[20px]">
                {item.icon()}
              </div>
              <p className="w-[300px] max-sm:w-[220px] mt-[35px] text-[25px] max-sm:text-[20px] font-semibold font-jose">
                {item.name}
              </p>
            </div>
          </DrawOutlineButton>
        ))}
      </div>
      {showmodal && (
        <ServiceModal setShowModal={setShowModal} service={selectedService} />
      )}
    </div>
  );
}
