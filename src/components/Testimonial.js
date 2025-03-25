"use client";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Charles GD",
    position: "Founder, Bullman Equipment",
    message:
      "The team’s expertise and attention to detail transformed our vision into a seamless, high-performance web solution. Their commitment to quality and innovation is outstanding.",
    image: "/assets/person/bullman.png",
  },
  {
    name: "Shad Ahmed",
    position: "CEO, Solvemeet & EastGold",
    message:
      "Exceptional development skills and professionalism! They delivered a scalable and user-friendly platform that exceeded our expectations. Highly recommended for any tech-driven project.",
    image: "/assets/person/shad.jpg",
  },
  {
    name: "Clarissa Soehnchen",
    position: "President, WeMasomo",
    message:
      "Their ability to understand complex requirements and turn them into functional, elegant solutions is impressive. The level of dedication and expertise is truly unmatched.",
    image: "/assets/person/clarissa.jpg",
  },
  {
    name: "Tafsirul Islam",
    position: "Co-Founder, Natgroove",
    message:
      "Outstanding development service! From UI/UX design to backend architecture, everything was executed flawlessly. Their problem-solving skills and efficiency saved us time and resources.",
    image: "/assets/person/tafsir.png",
  },
  {
    name: "Suhaib Safwan",
    position: "CEO, Nexcodeix",
    message:
      "Working with this team was a game-changer for our company. Their deep technical expertise and proactive communication ensured a smooth and successful project delivery.",
    image: "/assets/person/safwan.jpeg",
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 10000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-stone-950 p-6 max-sm:p-3">
      <div className=" flex flex-col lg:flex-row  w-full ">
        <div className="flex md:flex-col justify-center ml-10 max-sm:ml-0 max-lg:mr-10">
          <p
            className="text-[60px] max-sm:text-[24px] sm:max-lg:text-[40px] lg:max-xl:text-[40px]  max-md:mb-2 md:max-lg:mb-10 font-semibold text-white font-arsenal max-md:pt-12"
            style={{ textShadow: "5px 5px 5px rgb(110, 104, 104)" }}
          >
            Words From Our
          </p>
          <p
            className="text-[120px] max-sm:text-[24px] sm:max-lg:text-[40px] lg:max-xl:text-[80px]  md:max-lg:text-[80px] md:max-lg:mt-[-80px] max-md:pt-12  font-semibold text-white ml-20 max-sm:ml-1 sm:max-md:ml-4 font-arsenal"
            style={{ textShadow: "5px 5px 5px rgb(110, 104, 104)" }}
          >
            Clients
          </p>
        </div>
        <div className="relative flex items-center justify-center h-[450px] max-sm:h-[400px] w-full overflow-hidden">
          {testimonials.map((testimonial, i) => {
            const total = testimonials.length;
            const current = index % total;
            const next = (index + 1) % total;
            const prev = (index - 1 + total) % total;
            let zIndex = 0;
            let scale = 1;
            let opacity = 0;
            let x = 0; // Shift cards sideways
            let y = 0; // Shift cards up/down

            if (i === current) {
              zIndex = 10;
              scale = 1;
              opacity = 1;
              x = 0;
              y = 0;
            } else if (i === next) {
              zIndex = 5;
              scale = 0.9;
              opacity = 0.4;
              x = 200; // Move right
              y = 50;
            } else if (i === prev) {
              zIndex = 5;
              scale = 0.9;
              opacity = 0.4;
              x = -200; // Move left
              y = -50;
            }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity, scale, x, y }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className={`absolute bg-stone-950/40 backdrop-blur-lg border border-white/10 p-4 rounded-xl text-white text-center md:max-w-[450px] max-md:w-[250px] py-8 max-md:py-7  transition-all duration-500 ease-in-out transform ${
                  i === current ? "shadow-xl  shadow-lime-400/50" : "shadow-lg "
                }`}
                style={{ zIndex }}
              >
                <p className="text-[18px] max-sm:text-[14px] font-edu ">
                  "{testimonial.message}"
                </p>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400"
                      fill="currentColor"
                      size={14}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={90}
                    height={90}
                    className="rounded-full border-2 border-white shadow-md"
                  />
                </div>
                <div className="text-[18px] text-stone-400 font-play font-jose ">
                  {testimonial.name}
                </div>
                <div className="text-[10px] text-stone-600 font-mont ">
                  {testimonial.position}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
