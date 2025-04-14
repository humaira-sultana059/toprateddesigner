"use client";
import React, { useRef, useEffect, useState } from "react";
import Typed from "typed.js";
import MainButton from "./MainButton";

function HeroSection({ setIsModalOpen, image }) {
  const canvasRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Custom Web Applications",
        "Mobile App Development",
        "CMS Solutions",
        "AI-Powered Chatbots",
        "UI/UX Design Services",
        "SEO Optimization",
      ],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function Particle(x, y, isFirst = false) {
      this.x = x;
      this.y = y;
      this.size = isFirst ? 3 : Math.random() * 20 + 10;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = isFirst
        ? "rgba(66, 5, 43, 0.43)"
        : `hsl(${Math.random() * 360}, 100%, 50%)`;

      this.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95;
      };

      this.draw = function () {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "rgba(235, 13, 35, 0)");

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      };
    }

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y, i === 0));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size < 0.5) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="bg-stone-950 h-[100vh] max-sm:h-[44vh] sm:max-md:h-[60vh] md:max-lg:h-[50vh] lg:max-xl:h-[70vh] w-full bg-contain bg-no-repeat bg-center "
      style={{
        backgroundImage: `url(${image})` || "url('assets/TopRatedBg.png')",
      }}
      aria-label="Top Rated Design"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div className="flex flex-row w-full max-sm:px-5 md:max-xl:px-10 ">
        <div className="w-[100%] max-lg:w-[90%] flex flex-col items-start px-10 max-sm:px-0 xl:px-20 md:px-10 justify-center max-lg:mt-[-50px]">
          <div className="flex flex-col justify-start max-sm:ml-[20px] ">
            <header>
              <title className="sr-only">
                Top Rated Designer - Custom Web & Mobile App Development Agency
              </title>
              <meta
                name="description"
                content="Top Rated Designer is a digital product design agency specializing in custom web applications, mobile apps, and UI/UX design services."
              />
              <meta
                property="og:title"
                content="Top Rated Designer - Digital Product Design Agency"
              />
              <meta
                property="og:description"
                content="We design custom digital products to scale your brand's identity with web apps, mobile apps, and UI/UX services."
              />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://toprateddesigner.com/" />
              <meta
                property="og:image"
                content="https://www.toprateddesigner.com/"
              />
              <h1 className="sr-only">
                Top Rated Designer Digital Product Design Agency
              </h1>
              <h2
                className="flex flex-row font-alata font-bold text-[65px] max-sm:text-[20px] sm:max-md:text-[30px] md:max-lg:text-[40px] lg:max-xl:text-[60px] mt-52 max-sm:mt-48 animate-gradient bg-gradient-to-r from-fuchsia-700 via-cyan-500 to-amber-500 bg-clip-text text-transparent "
                style={{
                  animation: "gradientAnimation 4s infinite linear",
                }}
              >
                We Design Digital Products
              </h2>
              <p className="font-alata font-bold text-[65px] max-sm:text-[20px] sm:max-md:text-[30px] md:max-lg:text-[40px] lg:max-xl:text-[60px]  animate-gradient bg-gradient-to-r from-cyan-500 via-amber-500 to-fuchsia-700 bg-clip-text text-transparent mt-[-10px] max-xl:mt-[5px] ">
                To Scale Your Brand’s Identity.
              </p>
              <div className="flex flex-row items-center mt-[-10px] max-xl:mt-[5px] ">
                <p className="font-alata font-bold text-[55px] max-sm:text-[18px] max-md:text-[30px] md:max-lg:text-[40px] lg:max-xl:text-[60px]  text-fuchsia-200">
                  With{" "}
                </p>
                <div className="ml-4 max-sm:ml-2 w-full ">
                  <span
                    className="font-alata font-bold text-[55px] max-sm:text-[14px] max-md:text-[25px] md:max-lg:text-[34px] lg:max-xl:text-[60px]  text-fuchsia-200"
                    ref={typedRef}
                    aria-live="polite"
                  />
                </div>
              </div>
              <meta
                name="description"
                content="Top Rated Designer is a digital product design agency specializing in custom web applications, mobile apps, and UI/UX design services. Get scalable solutions for your brand."
              ></meta>
            </header>
          </div>

          <div className="mt-10 max-md:hidden flex flex-row w-[50%] justify-center ">
            <MainButton
              text={"Start A Project"}
              aria-label="Start a project for Web and Mobile Application"
              onclick={() => {
                setIsModalOpen(true);
              }}
            />
          </div>
          <div className="flex flex-row justify-center md:hidden  mt-6 w-full">
            <MainButton
              text={"Start A Project"}
              aria-label="Start a project for Web and Mobile Application"
              onclick={() => {
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
