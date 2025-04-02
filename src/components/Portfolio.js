"use client";
import { portfolio } from "@/constants/constants";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PortfolioShowcase() {
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const currentProject = portfolio[index];
  const currentImages = currentProject.images;

  // Preload images
  useEffect(() => {
    currentImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [index]);

  // Image cycling with longer interval
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImages.length, index]);

  return (
    <section
      id="portfolio"
      className="w-full bg-gradient-to-b from-black via-fuchsia-900 to-black shadow-xl overflow-hidden flex flex-col items-center justify-center px-4 pb-16 max-sm:pb-6 sm:max-md:pb-10"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <h1 className="sr-only">Our Portfolio of Recent Works</h1>

      <h2
        className="font-arsenal pt-[30px] text-[110px] max-sm:text-[30px] max-md:text-[40px] md:max-lg:text-[80px] max-lg:mb-10 mt-[10px] font-extrabold"
        style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
        itemProp="name"
      >
        Recent
        <span
          className="font-arsenal text-[110px] max-sm:text-[30px] sm:max-md:text-[40px] md:max-lg:text-[80px] text-cyan-500 font-extrabold"
          style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
        >
          {" "}
          Works Flow
        </span>
      </h2>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex flex-col lg:flex-row items-center justify-center h-full w-full"
      >
        {/* Project Details */}
        <div className="h-full flex justify-center items-center pr-3 max-lg:pr-0 max-lg:mb-10 w-[27%] max-sm:w-[90%] sm:max-lg:w-[60%] lg:max-xl:w-[30%]">
          <article
            className="flex flex-col items-center text-black px-[30px] max-sm:px-[10px] bg-white py-5 rounded-[2px]"
            itemScope
            itemType="https://schema.org/CreativeWork"
            itemProp="itemListElement"
          >
            <meta itemProp="position" content={index + 1} />
            <div className="flex flex-col items-start">
              <p className="font-cardo text-[20px] mb-[-15px] font-semibold">
                {currentProject.type}
              </p>
              <h3
                className="font-cardo text-[24px] max-md:text-[18px] md:max-xl:text-[18px] text-cyan-500 mt-4 font-bold border-b border-fuchsia-500 w-full uppercase"
                itemProp="name"
              >
                {currentProject.name}
              </h3>
              <p
                className="font-jose text-[14px] text-stone-800 mt-[15px] font-medium text-justify leading-[20px] hyphens-auto"
                itemProp="description"
              >
                {currentProject.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {currentProject.technologies.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-[6px] py-[2px] text-[12px] text-stone-800 border-[1px] border-fuchsia-500 rounded-full font-jose"
                    itemProp="keywords"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <meta
                itemProp="dateCreated"
                content={currentProject.launchDate}
              />
              {currentProject.projectUrl && (
                <a
                  href={currentProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-sm text-cyan-600 hover:underline"
                  itemProp="url"
                >
                  Visit Live Project
                </a>
              )}
            </div>
          </article>
        </div>

        {/* Project Images */}
        <div
          className="flex items-center justify-center relative w-full max-w-[500px] md:max-w-[600px] lg:max-w-[50%] aspect-[16/9] px-3 backdrop-blur-lg border border-white/10 bg-black/30 py-5 rounded-lg lg:ml-10 shadow-cyan-400/50 shadow-md"
          itemProp="image"
        >
          <div className="relative w-full h-full">
            {currentImages.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg py-3 px-2"
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Project Navigation */}
      <div className="w-full flex justify-center gap-4 py-3 px-6 my-5">
        {portfolio.map((item, i) => (
          <button
            key={item.id}
            onClick={() => {
              if (index !== i) {
                setIndex(i);
                setImageIndex(0);
              }
            }}
            aria-label={`View ${item.name} project`}
            className={`transition-all duration-300 ${
              index === i ? "scale-110" : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={item.images[0].src}
              alt={`Thumbnail for ${item.name}`}
              className={`w-16 h-16 max-sm:w-10 max-sm:h-10 object-contain border-2 rounded-md ${
                index === i ? "border-[#3299a8]" : "border-gray-300"
              }`}
              width={64}
              height={64}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
