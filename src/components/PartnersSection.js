"use client";
import { motion } from "framer-motion";
import React from "react";

export const PartnersSection = ({ patner }) => {
  // Duplicate the logos to create a seamless loop
  const duplicatedPartners = patner ? [...patner, ...patner] : [];

  return (
    <section
      className="2xl:h-[75vh] bg-stone-950 bg-contain bg-no-repeat bg-center max-sm:pt-5"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <h1 className="sr-only">Our Trusted Partners and Clients</h1>

      <h2
        className="text-[100px] max-sm:text-[30px] max-md:text-[40px] md:max-lg:text-[50px] lg:max-xl:text-[80px] max-lg:mb-10 font-arsenal px-20 max-md:px-8 font-extrabold text-start"
        style={{ textShadow: "5px 5px 5px rgb(110, 104, 104)" }}
        itemProp="name"
      >
        Trusted Partners
      </h2>

      <div className="top-0 flex overflow-hidden w-full">
        <motion.div
          className="flex flex-row items-center justify-center whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 100,
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }}
          aria-hidden="true"
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.uid}-${index}`}
              className="text-2xl w-[220px] h-[150px] sm:max-md:w-[170px] sm:max-md:h-[100px] max-sm:w-[100px] max-sm:h-[70px] mb-10 mx-[20px] backdrop-blur-lg border-[1px] border-white/10 bg-gray-900/50 shadow-md shadow-indigo-950/60 rounded-xl justify-center items-center flex flex-row"
              itemScope
              itemType="https://schema.org/Organization"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={index + 1} />
              <div className="w-[100px] h-[100px] max-sm:w-[50px] max-sm:h-[50px] sm:max-md:w-[50px] sm:max-md:h-[50px] flex items-center justify-center">
                <a
                  //  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${partner.name} website`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="object-contain curson-normal w-[100px] h-[100px] "
                    loading="lazy"
                    itemProp="logo"
                  />
                </a>
              </div>
              <meta itemProp="name" content={partner.name} />
              <meta itemProp="description" content={partner.description} />
              <meta itemProp="url" content={partner.url} />
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
            duration: 100,
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }}
          aria-hidden="true"
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-secondary-${index}`}
              className="text-2xl w-[220px] h-[150px] max-sm:w-[100px] max-sm:h-[70px] sm:max-md:w-[170px] sm:max-md:h-[100px] mb-10 mx-[20px] backdrop-blur-lg border-[1px] bg-gray-900/50 border-white/10 shadow-md shadow-indigo-950/60 rounded-xl justify-center items-center flex flex-row"
              itemScope
              itemType="https://schema.org/Organization"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={index + 1} />
              <div className="w-[100px] h-[100px] max-sm:w-[50px] max-sm:h-[50px] sm:max-md:w-[50px] sm:max-md:h-[50px] flex items-center justify-center">
                <a
                  //  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${partner.name} website`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="object-contain curson-normal w-[100px] h-[100px] "
                    loading="lazy"
                    itemProp="logo"
                  />
                </a>
              </div>
              <meta itemProp="name" content={partner.name} />
              <meta itemProp="description" content={partner.description} />
              <meta itemProp="url" content={partner.url} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
