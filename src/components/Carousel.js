"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Carousel() {
  const slides = [
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.png",
    "/images/banner4.png",
    "/images/banner5.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  // Clone the first and last slides for seamless looping
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= slides.length + 1) return 1; // Jump to clone of first slide
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev <= 0) return slides.length; // Jump to clone of last slide
      return prev - 1;
    });
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  // Handle the transition when we reach the cloned slides
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = () => {
      if (currentSlide === 0) {
        setIsTransitioning(false);
        setCurrentSlide(slides.length);
      } else if (currentSlide === slides.length + 1) {
        setIsTransitioning(false);
        setCurrentSlide(1);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentSlide, slides.length]);

  // Re-enable transitions after we've jumped positions
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full h-screen">
      <div className="overflow-hidden h-full">
        <div
          ref={sliderRef}
          className="flex h-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: isTransitioning
              ? "transform 500ms ease-in-out"
              : "none",
          }}
        >
          {extendedSlides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={slide}
                alt={`Slide ${index}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-2 mx-3 py-1 bg-gray-800 text-white rounded"
      >
        <i className="fa-solid fa-arrow-left text-[26px] text-gray-400 "></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 mx-3 py-1 bg-gray-800 text-white rounded"
      >
        <i className="fa-solid fa-arrow-right text-[26px] text-gray-400 "></i>
      </button>
    </div>
  );
}
