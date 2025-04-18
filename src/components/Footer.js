"use client";
import React from "react";
import { services, socialMedia, terms } from "@/constants/constants";
import MainButton from "./MainButton";
import Link from "next/link";

export default function Footer({ setIsModalOpen, logo, award }) {
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
    <footer className="w-full  bg-zinc-950  flex flex-col pt-10 pb-[8px] ">
      {/* Schema.org markup for LocalBusiness */}
      <div
        itemScope
        itemType="https://schema.org/LocalBusiness"
        className="hidden"
      >
        <meta itemProp="name" content="Top Rated Designer" />
        <div
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <meta itemProp="addressLocality" content="Chittagong" />
          <meta itemProp="addressRegion" content="Bangladesh" />
        </div>
        <meta itemProp="email" content="topratedesigner@gmail.com" />
        <meta itemProp="telephone" content="+8801799008100" />
        <meta itemProp="url" content="https://toprateddesigner.com/" />
      </div>

      <div className="flex flex-row max-md:flex-col md:items-center md:justify-between px-24 md:max-lg:px-10 max-md:px-5">
        {/* Introduction */}
        <div className="flex flex-col max-md:items-center max-md:w-full max-md:mb-10">
          <img
            src={logo || "/assets/logo-2.svg"}
            alt="Top Rated Designer Logo"
            className="w-[220px] h-[120px] cursor-pointer"
            onClick={() => handleNavClick("home")}
            loading="lazy"
          />

          <p className="w-[300px] md:max-lg:w-[200px] max-md:w-full font-lato text-[12px] text-justify text-white/60">
            Empowering Ideas, Crafting Innovation. At TOP RATED DESIGNER, we
            turn visions into reality through cutting-edge code and creative
            solutions. Let's shape the future together—one line of code at a
            time!
          </p>
          <div className=" mt-3 ">
            <h2 className="pb-1 text-[18px] md:max-lg:text-[15px] text-white/90 font-lato font-bold">
              Verified On
            </h2>
            <div className="flex flex-row">
              {award
                ?.slice()
                .reverse()
                .map((item, index) => (
                  <a key={index} itemProp="link" href={item.link}>
                    <img
                      src={item.logo}
                      alt="Top Rated Designer Logo"
                      className="w-[80px] h-[45px] mr-3 cursor-pointer"
                      loading="lazy"
                    />
                  </a>
                ))}
            </div>
          </div>
        </div>
        {/* Terms & conditions */}
        <nav aria-label="Legal information">
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
        </nav>
        {/* Services */}
        <nav aria-label="Legal information">
          <h2 className="pb-1 text-[18px]  md:max-lg:text-[15px] text-white/90 font-lato font-bold">
            Our Expertise
          </h2>
          <ul>
            {services.map((item, index) => (
              <li
                key={index}
                className="text-[13px] font-lato font-medium text-white/60 my-2 cursor-pointer"
              >
                <p
                  onClick={() => handleNavClick("services")}
                  aria-label={`Navigate to ${item.nick_name} services`}
                >
                  {item.nick_name}
                </p>
              </li>
            ))}
          </ul>
        </nav>
        {/* Contact */}
        <div className="flex flex-col">
          <MainButton
            text={"Connect Us"}
            onclick={() => {
              setIsModalOpen(true);
            }}
            aria-label="Open contact form modal"
          />
          <div className="text-[15px] mt-8 max-md:mt-5 font-lato text-stone-200/60">
            <p
              className="mt-2"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <i
                className="fa-solid fa-location-dot text-[14px] mr-2"
                aria-hidden="true"
              ></i>
              <span itemProp="addressLocality">Chittagong</span>,{" "}
              <span itemProp="addressRegion">Bangladesh</span>
            </p>
            <p className="mt-2">
              <i
                className="fa-solid fa-envelope text-[14px] mr-2"
                aria-hidden="true"
              ></i>
              <a
                href="mailto:topratedesigner@gmail.com"
                className="hover:text-white transition-colors"
                itemProp="email"
              >
                topratedesigner@gmail.com
              </a>
            </p>
            <p className="mt-2">
              <i
                className="fa-solid fa-phone text-[14px] mr-2"
                aria-hidden="true"
              ></i>
              <a
                href="tel:+8801799008100"
                className="hover:text-white transition-colors"
                itemProp="telephone"
              >
                +8801799008100
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Copyright Text & social media */}
      <div className="flex flex-row md:mt-10 max-md:mt-4 max-md:flex-col border-t border-t-gray-600/50 pt-4 max-md:pt-2">
        <div className=" flex flex-row max-md:flex-col w-full items-center justify-between mb-5  px-[50px] max-sm:px-4">
          <p className="text-white text-start font-jose font-semibold text-[13px] max-sm:text-[10px] max-md:mt-5">
            © {new Date().getFullYear()} Top Rated Designer. All Rights
            Reserved.
          </p>
          <nav aria-label="Social media links">
            <ul className="flex flex-row justify-center">
              {socialMedia.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="w-[40px] h-[40px] mx-2 max-sm:mx-1 flex items-center justify-center text-white/60 transition-all duration-500 hover:text-stone-950 hover:bg-white hover:rounded-full cursor-pointer text-[20px]"
                  aria-label={`Visit our ${item.name} page`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon()}
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
