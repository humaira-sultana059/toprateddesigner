"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const steps = [
  { id: 1, title: "Plan", x: 150, y: 150, icon: "assets/plan.png" },
  { id: 2, title: "Design", x: 400, y: 150, icon: "assets/design.png" },
  { id: 3, title: "Develop", x: 400, y: 300, icon: "assets/develop.png" },
  { id: 4, title: "Test", x: 150, y: 300, icon: "assets/test.png" },
  { id: 5, title: "Deploy", x: 150, y: 450, icon: "assets/deploy.png" },
  { id: 6, title: "Review", x: 400, y: 450, icon: "assets/review.png" },
  // { id: 7, title: "Launch", x: 400, y: 600, icon: "assets/launch.png" },
];

const texts = [
  {
    title: "Plan",
    desc: "We begin the development process by strategizing and outlining key objectives, defining the project scope, and setting milestones to ensure a structured and efficient workflow.",
  },
  {
    title: "Design",
    desc: "Our design phase focuses on crafting intuitive and visually engaging UI/UX for both web and mobile applications, ensuring seamless user experiences across all devices.",
  },
  {
    title: "Develop",
    desc: "We develop high-performing, scalable, and secure applications using modern technologies, following best coding practices to ensure maintainability and efficiency.",
  },
  {
    title: "Test",
    desc: "Rigorous testing is conducted across various devices and platforms to detect and resolve bugs, ensuring optimal performance, security, and reliability.",
  },
  {
    title: "Deploy",
    desc: "We deploy applications with a smooth transition, configuring environments, optimizing server performance, and ensuring seamless integration with third-party services.",
  },
  {
    title: "Review",
    desc: "Post-deployment, we conduct in-depth reviews, gather user feedback, and implement necessary refinements to enhance functionality and performance.",
  },
  // "The final launch phase ensures that the application is fully optimized, secure, and ready for a successful market release, backed by ongoing support and updates.",
];

export default function Steps() {
  const iconsRef = useRef([]);
  const linesRef = useRef([]);
  const textsRef = useRef([]);
  const iconWrappersRef = useRef([]);
  const movingCirclesRef = useRef([]);
  const sectionRef = useRef(null); // Reference for the section
  const textLinesRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMedium(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect(); // Run the animation once
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    steps.forEach((step, index) => {
      gsap.set(
        [
          iconsRef.current[index],
          textsRef.current[index],
          iconWrappersRef.current[index],
          // textLinesRef.current[index], // Ensure text lines start from opacity 0
        ],
        { opacity: 0 }
      );

      if (index > 0) {
        gsap.set(linesRef.current[index - 1], {
          opacity: 0,
          strokeDashoffset: "400",
        });

        gsap.set(movingCirclesRef.current[index - 1], {
          cx: steps[index - 1].x,
          cy: steps[index - 1].y,
          opacity: 0,
        });
      }

      if (index > 0) {
        tl.fromTo(
          linesRef.current[index - 1],
          { strokeDasharray: "400", strokeDashoffset: "400", opacity: 0 },
          {
            strokeDashoffset: "0",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            onStart: () => {
              gsap.set(movingCirclesRef.current[index - 1], { opacity: 1 });
            },
            onUpdate: function () {
              const progress = this.progress();
              const x1 = isMedium ? steps[index - 1].x / 2 : steps[index - 1].x;
              const y1 = isMedium ? steps[index - 1].y / 2 : steps[index - 1].y;
              const x2 = isMedium ? step.x / 2 : step.x;
              const y2 = isMedium ? step.y / 2 : step.y;

              const newX = isMedium
                ? (x1 + (x2 - x1) * progress) / 2
                : x1 + (x2 - x1) * progress;
              const newY = isMedium
                ? (y1 + (y2 - y1) * progress) / 2
                : y1 + (y2 - y1) * progress;

              gsap.set(movingCirclesRef.current[index - 1], {
                cx: newX,
                cy: newY,
              });
            },
            onComplete: () => {
              gsap.to(movingCirclesRef.current[index - 1], {
                opacity: 0,
                duration: 0.2,
              });
            },
          }
        );
      }

      // Animate Step Box, Icons, and Texts
      tl.to(
        [
          iconsRef.current[index],
          textsRef.current[index],
          iconWrappersRef.current[index],
          textLinesRef.current[index], // Animate text lines divs
        ],
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          onStart: () => setActiveStep(index),
        }
      );
    });

    tl.set(
      [
        ...iconsRef.current,
        ...textsRef.current,
        ...linesRef.current,
        ...iconWrappersRef.current,
        ...movingCirclesRef.current,
        //...textLinesRef.current, // Reset text lines too
      ],
      {
        opacity: 0,
      }
    );
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-auto overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/step-bg.png')" }}
    >
      {/* <img src="/assets/step-bg.png" className="w-full h-full" /> */}
      <h2
        className="text-[120px] max-sm:text-[40px] sm:max-md:text-[70px] font-arsenal font-medium text-start pl-20 max-md:pl-5"
        style={{ textShadow: "5px 5px 5px rgb(110, 104, 104)" }}
      >
        How We Do
      </h2>
      <div className="w-full flex flex-row max-lg:flex-col relative px-24 max-sm:px-2 sm:max-md:px-10 md:max-xl:px-10  py-10">
        <div className="w-[55%] max-lg:w-full flex flex-col justify-start pb-10">
          {/*text lines */}
          <div className=" grid grid-cols-2 max-sm:grid-cols-1 max-sm:px-5 gap-4">
            {texts.map((item, index) => (
              <div
                key={index}
                ref={(el) => (textLinesRef.current[index] = el)}
                className={`flex flex-col border-white/10 px-3 py-3  shadow-md items-start my-2 transition-all duration-500  ${
                  activeStep === index
                    ? "bg-cyan-500/70 "
                    : "bg-sky-950/40 shadow-cyan-400/50"
                }`}
              >
                <div className="flex flex-row items-center mb-2">
                  <span className=" border-2 border-cyan-400/50 rounded-[2px] w-[26px] h-[24px] text-white font-bold text-[14px] flex items-center justify-center mt-1 mr-3">
                    {index + 1}
                  </span>
                  <p className="text-white font-extrabold text-[16px]">
                    {item.title}
                  </p>
                </div>
                <p className="text-[13px] font-medium text-white text-justify">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* steps */}
        <div className="w-[45%] max-lg:w-full mt-[-60px] flex justify-center items-center lg:max-xl:ml-[-40px]">
          <svg className="w-[600px] h-[700px]  max-md:w-[290px] max-sm:h-[260px] sm:max-md:h-[300px]">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#ff7f50", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#ff1493", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>

            {steps.map((step, index) => {
              const adjustedX = isMedium ? step.x / 2 : step.x;
              const adjustedY = isMedium ? step.y / 2 : step.y;

              if (index === 0) return null;
              return (
                <g key={`line-group-${index}`}>
                  <line
                    ref={(el) => (linesRef.current[index - 1] = el)}
                    x1={isMedium ? steps[index - 1].x / 2 : steps[index - 1].x}
                    y1={isMedium ? steps[index - 1].y / 2 : steps[index - 1].y}
                    x2={adjustedX}
                    y2={adjustedY}
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    opacity="0"
                  />
                  {/* small circle */}
                  <circle
                    ref={(el) => (movingCirclesRef.current[index - 1] = el)}
                    cx={isMedium ? steps[index - 1].x / 2 : steps[index - 1].x}
                    cy={isMedium ? steps[index - 1].y / 2 : steps[index - 1].y}
                    r="6"
                    fill="yellow"
                    opacity="0"
                    className={isMedium ? "hidden" : ""}
                  />
                </g>
              );
            })}
            {/* step boxes */}
            {steps.map((step, index) => {
              const adjustedX = isMedium ? step.x / 2 : step.x;
              const adjustedY = isMedium ? step.y / 2 : step.y;
              return (
                <g key={step.id}>
                  <rect
                    ref={(el) => (iconsRef.current[index] = el)}
                    x={adjustedX - (isMedium ? 25 : 40)}
                    y={adjustedY - (isMedium ? 25 : 40)}
                    className="w-[80px] h-[80px] max-md:w-[50px] max-md:h-[50px]"
                    rx="4"
                    ry="4"
                    fill="#0eede2"
                    filter="blur(2px)"
                    opacity="0.2"
                  />
                  <foreignObject
                    ref={(el) => (iconWrappersRef.current[index] = el)}
                    x={adjustedX - (isMedium ? 15 : 20)}
                    y={adjustedY - (isMedium ? 15 : 30)}
                    width="40"
                    height="40"
                    className="w-[40] h-[40] max-md:w-[27px] max-md:h-[20px]"
                    opacity="0"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <img src={step.icon} alt={step.title} />
                    </div>
                  </foreignObject>
                  <text
                    ref={(el) => (textsRef.current[index] = el)}
                    x={adjustedX}
                    y={adjustedY + (isMedium ? 18 : 30)}
                    fill="black"
                    textAnchor="middle"
                    fontSize={isMedium ? "10" : "15"}
                    fontWeight="700"
                    opacity="0"
                  >
                    {step.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
