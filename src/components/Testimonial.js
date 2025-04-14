"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Testimonial({ review }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!review || review.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setIndex((prevIndex) => (prevIndex + 1) % review.length);
      setTimeout(() => setIsAnimating(false), 1500); // Match this with your animation duration
    }, 5000);

    return () => clearInterval(interval);
  }, [review]);

  if (!review || review.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="bg-stone-950 p-6 max-sm:p-3"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <h1 className="sr-only">Client Testimonials</h1>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex md:flex-col justify-center ml-10 max-sm:ml-0 max-lg:mr-10">
          <h2
            className="text-[60px] max-sm:text-[24px] sm:max-lg:text-[40px] lg:max-xl:text-[40px] max-md:mb-2 md:max-lg:mb-10 font-semibold text-white font-arsenal max-md:pt-12"
            style={{ textShadow: "5px 5px 5px rgb(110, 104, 104)" }}
            itemProp="name"
          >
            Words From Our
          </h2>
          <h3
            className="text-[120px] max-sm:text-[24px] sm:max-lg:text-[40px] lg:max-xl:text-[80px] md:max-lg:text-[80px] md:max-lg:mt-[-80px] max-md:pt-12 font-semibold text-white ml-20 max-sm:ml-1 sm:max-md:ml-4 font-arsenal"
            style={{ textShadow: "5px 5px 5px rgb(110, 104, 104)" }}
          >
            Clients
          </h3>
        </div>
        <div className="relative flex items-center justify-center h-[450px] max-sm:h-[400px] w-full overflow-hidden">
          {review.map((rev, i) => {
            const total = review.length;
            const current = index % total;
            const next = (index + 1) % total;
            const prev = (index - 1 + total) % total;

            let zIndex = 0;
            let scale = 1;
            let opacity = 1; // Changed from 0 to 1 for initial render
            let x = 0;
            let y = 0;

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
              x = 200;
              y = 50;
            } else if (i === prev) {
              zIndex = 5;
              scale = 0.9;
              opacity = 0.4;
              x = -200;
              y = -50;
            } else {
              // For all other cards
              opacity = 0;
              scale = 0.8;
              y = 100;
            }

            return (
              <motion.div
                key={i}
                initial={false} // Changed from initial animation
                animate={{
                  opacity,
                  scale,
                  x,
                  y,
                  transition: { duration: 1.5, ease: "easeInOut" },
                }}
                className={`absolute bg-stone-950/40 backdrop-blur-lg border border-white/10 p-4 rounded-xl text-white text-center md:max-w-[450px] max-md:w-[250px] py-8 max-md:py-7 transition-all duration-500 ease-in-out transform ${
                  i === current ? "shadow-xl shadow-lime-400/50" : "shadow-lg"
                }`}
                style={{ zIndex }}
                itemScope
                itemType="https://schema.org/Review"
                itemProp="itemListElement"
              >
                <meta itemProp="position" content={i + 1} />
                <div itemProp="reviewBody">
                  <p className="text-[18px] max-sm:text-[14px] font-edu">
                    "{rev.review}"
                  </p>
                </div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <img
                    src={rev.image}
                    alt={rev.name}
                    width={90}
                    height={90}
                    className="rounded-full border-2 border-white shadow-md"
                    loading="lazy"
                    itemProp="image"
                  />
                </div>
                <div
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <div
                    className="text-[18px] text-stone-400 font-play font-jose"
                    itemProp="name"
                  >
                    {rev.name}
                  </div>
                </div>
                <div
                  itemProp="publisher"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <div
                    className="text-[10px] text-stone-600 font-mont"
                    itemProp="name"
                  >
                    {rev.position}
                  </div>
                  {rev.review && <meta itemProp="url" content={rev.review} />}
                </div>
                <meta itemProp="datePublished" content={rev.updated_at} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
