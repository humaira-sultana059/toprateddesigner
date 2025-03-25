"use client";
import { blogs } from "@/constants/constants";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function Blog() {
  const sectionRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  // Handle scroll events for both text and images containers
  const handleScroll = (event) => {
    if (!isScrollLocked) return;

    event.preventDefault();

    const delta = event.deltaY / 3; // Reduce scroll speed by dividing

    if (imagesContainerRef.current) {
      imagesContainerRef.current.scrollTop += delta;

      const maxScroll =
        imagesContainerRef.current.scrollHeight -
        imagesContainerRef.current.clientHeight;

      if (
        imagesContainerRef.current.scrollTop <= 0 ||
        imagesContainerRef.current.scrollTop >= maxScroll
      ) {
        setIsScrollLocked(false);
      }
    }
  };

  // Add scroll event listeners when scroll is locked
  useEffect(() => {
    const textContainer = textContainerRef.current;
    const section = sectionRef.current;

    if (isScrollLocked) {
      // Add scroll event listeners to the text container and section
      textContainer?.addEventListener("wheel", handleScroll, {
        passive: false,
      });
      section?.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      // Cleanup event listeners
      textContainer?.removeEventListener("wheel", handleScroll);
      section?.removeEventListener("wheel", handleScroll);
    };
  }, [isScrollLocked]);

  // Intersection Observer to lock scroll when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Lock scrolling when 30% of the section is in view
        if (entry.intersectionRatio >= 0.3) {
          setIsScrollLocked(true);
        } else {
          setIsScrollLocked(false); // Unlock scroll when section goes out of view or less than 30%
        }
      },
      { threshold: 0.3 } // Lock scroll when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Start observing the section
    }

    return () => observer.disconnect(); // Cleanup observer when component unmounts
  }, [isScrollLocked]);

  return (
    <div
      ref={sectionRef}
      id="blog"
      className="relative flex md:flex-row max-md:flex-col w-full pb-10 max-md:h-full h-[150vh] md:max-lg:h-[90vh] lg:max-xl:h-[100vh] xl:max-2xl:h-[120vh] bg-black overflow-hidden bg-cover bg-no-repeat bg-center pt-44 max-md:pt-20"
      style={{
        backgroundImage: "url('assets/blog-bg2.png')",
      }}
    >
      {/* Text div */}
      <div
        ref={textContainerRef}
        className="lg:w-[50%] md:max-lg:w-[40%] h-full overflow-hidden relative pt-10 max-sm:pt-0 pl-20 max-lg:pl-10"
      >
        <div className="flex flex-row w-full lg:mt-4">
          <p className="text-[55px] max-sm:text-[24px] text-stone-200 font-arsenal font-semibold leading-[55px] max-sm:leading-[30px]">
            How Do We Use Latest
            <span className="block text-[55px] max-sm:text-[24px] text-stone-400 md:text-stone-700 font-arsenal font-semibold">
              Technology
            </span>
          </p>
        </div>
        <div className="flex flex-row w-full h-[120px] pt-4 pl-1 pr-5">
          <p className="lg:text-[20px] sm:max-lg:text-[16px] max-sm:text-[13px] text-zinc-100 lg:text-zinc-900 font-write font-medium lg:leading-[30px] text-justify">
            We use the latest technologies to create fast, secure, and scalable
            digital solutions, ensuring seamless user experiences and
            future-ready applications.
          </p>
        </div>
        <div className="flex flex-row justify-center max-md:mt-10 md:max-lg:mt-28 lg:max-xl:mt-28">
          <img
            src="/assets/robot.png"
            className="w-[455px] max-lg:w-[250px] lg:max-2xl:w-[340px] h-full "
          />
        </div>
      </div>

      {/* Images div */}
      <div
        ref={imagesContainerRef}
        className="lg:w-[50%] md:max-lg:w-[60%] h-full overflow-y-auto relative scrollbar-hide px-10 max-sm:px-5 mt-10 mb-5 pb-5"
      >
        {blogs.map((item, index) => (
          <Link
            href={{
              pathname: `/${item.type}`,
              query: {
                blog: JSON.stringify({ id: item.id, name: item.headline }),
              },
            }}
            className="group flex max-sm:flex-col bg-cyan-700/20 backdrop-blur-lg border border-stone-200/30 hover:border-none hover:bg-slate-900 py-5 px-2 my-6 cursor-pointer transition-all duration-1000 ease-in-out hover:shadow-xl hover:shadow-pink-700/50 relative"
            key={index}
          >
            {/* Image section - takes 1/3 of the space */}
            <div className="sm:w-1/3 max-sm:w-full max-sm:h-full max-sm:mb-10  flex justify-center items-center">
              {item.images()}
            </div>

            {/* Text section - takes 2/3 of the space */}
            <div className="sm:w-2/3 max-sm:w-full max-sm:h-full   flex flex-col px-4 max-sm:px-2">
              <p className="text-[22px] md:max-lg:text-[18px] max-sm:text-[18px] font-jose font-semibold">
                {item.headline}
              </p>
              <p className="text-[15px] md:max-lg:text-[12px] max-sm:text-[11px] font-write text-stone-950 font-normal leading-[25px] md:max-lg:leading-[20px] max-sm:leading-[18px] text-justify group-hover:text-stone-400 max-sm:text-stone-300 transition-all duration-300 ease-in-out">
                {item.desc}
              </p>
              <div className="absolute right-10 bottom-[-10px] transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="inline-block animate-slide text-2xl text-white">
                  <i className="fa fa-arrow-right-long"></i>
                </span>
              </div>
            </div>

            {/* Animated Arrow */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
