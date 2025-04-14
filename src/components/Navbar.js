"use client";
import React, { useState, useEffect, useRef } from "react";
import { navMenu } from "@/constants/constants";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons
import Head from "next/head";

export default function Navbar({ setIsModalOpen, logo }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for sidebar menu

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false); // Close menu after clicking a link
  };

  const handleSetActiveSection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(handleSetActiveSection, {
      threshold: 0.5,
    });

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isMenuOpen]);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.toprateddesigner.com" />
      </Head>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 w-full font-ubuntu z-[100] transition-all duration-700 ${
          scrolled ? "mt-0 mx-0" : "mt-12 px-16"
        }`}
      >
        {/* Desktop Navbar */}
        <div
          className={`max-lg:hidden fixed top-0 w-full font-ubuntu transition-all duration-700 ${
            scrolled ? "mt-0 mx-0" : "mt-12 px-16 lg:max-xl:px-8"
          }`}
        >
          <div
            className={`w-full ${
              scrolled
                ? "border-b border-white/20 bg-stone-950/20 backdrop-blur-lg"
                : "border-transparent"
            }  h-24 flex flex-row transition-all duration-300`}
          >
            <div className="flex flex-row justify-between items-center w-full mx-10">
              <img
                onClick={() => handleNavClick("home")}
                src={logo || "/assets/logo-2.svg"}
                className="w-[120px] cursor-pointer"
              />

              <div className="flex flex-row items-center justify-end font-jose font-semibold text-white ml-10">
                <SlideTabs
                  handleNavClick={handleNavClick}
                  activeSection={activeSection}
                />
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="relative cursor-pointer overflow-hidden border-[1px] border-primary rounded-[6px] py-3 px-5 text-primary group mx-3"
                >
                  <p className="relative z-10 text-[14px] font-lato font-bold group-hover:text-[#fff]">
                    Get In Touch
                  </p>
                  <span className="absolute bottom-0 left-0 w-full h-full bg-stone-500 origin-bottom-left scale-x-0 scale-y-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:scale-y-100"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden fixed top-0 right-0 w-full px-4 py-2 flex justify-between items-center border-b border-white/20 bg-stone-950/20 backdrop-blur-lg  z-[110]">
          <img
            onClick={() => handleNavClick("home")}
            src="/assets/logo-2.svg"
            className="w-[100px]"
          />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-10 h-[21px] flex flex-col justify-between items-center z-[110]"
          >
            <span
              className={`block w-8 h-[1px] bg-white transition-transform duration-500 ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block w-8  h-[1px] bg-white transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-8 h-[1px] bg-white transition-transform duration-500 ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>
        {/* Background Blur Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-lg transition-opacity duration-300 z-[99]"
            onClick={() => setIsMenuOpen(false)} // Close sidebar when clicking outside
          ></div>
        )}

        {/* Side Navbar (Mobile) */}
        <div
          className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-black/90 text-white p-6 transform transition-transform duration-300 ease-in-out z-[101] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="mt-24 space-y-8 text-[15px] font-medium">
            {navMenu.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleNavClick(item.id);
                  setIsMenuOpen(false);
                }}
                className="cursor-pointer font-cardo hover:text-teal-400 transition duration-200"
              >
                {item.name}
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsMenuOpen(false);
            }}
            className="mt-6 w-[150px] text-center border border-teal-500 py-2 rounded-lg hover:bg-teal-500  transition duration-300"
          >
            <p>Get In Touch</p>
          </button>
        </div>
      </nav>
    </>
  );
}

// Slide Tabs Component (for Desktop Navbar)
const SlideTabs = ({ handleNavClick, activeSection }) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
      className="relative mx-auto flex w-fit rounded-full border-2 bg-stone-950/60 backdrop-blur-lg border-white p-1"
    >
      {navMenu.map((item, index) => (
        <Tab
          key={index}
          setPosition={setPosition}
          onclick={() => handleNavClick(item.id)}
          isActive={activeSection === item.id}
        >
          {item.name}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

// Tab Component
const Tab = ({ children, setPosition, onclick }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className="relative z-10 block cursor-pointer font-medium font-roboto px-3 py-1.5 lg:text-[16px] max-lg:text-[15px] uppercase text-white mix-blend-difference md:px-5 xl:px-8 md:py-3"
      onClick={onclick}
    >
      {children}
    </li>
  );
};

// Cursor Component
const Cursor = ({ position }) => (
  <motion.li
    animate={{ ...position }}
    className="absolute z-0 h-7 rounded-full bg-white md:h-12"
  />
);
