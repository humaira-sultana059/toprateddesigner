"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const projectTypes = [
    "Web Design",
    "Mobile App",
    "Custom Development",
    "UX Design",
    "SEO",
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: [],
    message: "",
  });

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle selection
  const toggleSelection = (type) => {
    setFormData((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type],
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          projectType: [],
          message: "",
        });

        setTimeout(() => {
          onClose(); // Close the modal after 6 seconds
        }, 5000);
      } else {
        setStatus("failed");
        setTimeout(() => {
          onClose(); // Close the modal after 6 seconds
        }, 6000);
      }
    } catch (error) {
      setStatus("failed");
      setTimeout(() => {
        onClose();
      }, 6000);
    }

    setLoading(false);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative w-full  max-w-xl max-sm:mt-16 mt-16 max-sm:mx-3"
        >
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 400 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
            preserveAspectRatio="none"
          >
            <motion.rect
              x="5"
              y="5"
              width="390"
              height="242.5"
              rx="0"
              stroke="oklch(0.704 0.14 182.503)"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.svg>

          <motion.div
            className="bg-black/90 p-6 shadow-lg w-full h-full mt-[2px] max-sm:mt-[3px] relative overflow-hidden flex-grow overflow-y-auto scrollbar-hide"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 0.97 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 max-sm:top-[6px] max-sm:right-[8px] text-white/60 hover:text-white text-lg"
            >
              ✕
            </button>
            {!status && !loading && (
              <div>
                <p
                  className="font-arsenal pb-[5px] text-[30px] text-white font-extrabold"
                  style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
                >
                  Let's create an awesome
                  <span
                    className="font-arsenal text-[30px] text-cyan-500 font-extrabold"
                    style={{ textShadow: "20px 10px 10px rgba(0,0,0,0.3)" }}
                  >
                    {" "}
                    Project
                  </span>
                </p>
                <p className="text-[16px] text-stone-400 font-lato font-semibold mb-5">
                  Fill out the form below to get started
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-3"
                >
                  <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border border-teal-500 p-3 rounded-[2px] w-full bg-teal-500/10 placeholder:text-white text-[13px] outline-none focus:ring-0 focus:border-teal-200"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border border-teal-500 p-3 rounded-[2px] w-ful bg-teal-500/10 placeholder:text-white text-[13px] outline-none focus:ring-0 focus:border-teal-200"
                    />
                  </div>

                  <div className="">
                    <p className="text-white font-lato font-semibold text-[16px] my-3">
                      What is your project type?
                    </p>
                    <div className="flex flex-wrap gap-2 my-2">
                      {projectTypes.map((type, idx) => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleSelection(type)}
                            type="button"
                            className={`flex items-center gap-2 px-3 py-1 text-[12px] border rounded-full transition-all ${
                              formData.projectType.includes(type)
                                ? "bg-teal-500/10 text-white border-teal-500"
                                : "text-stone-200 border-teal-500"
                            }`}
                          >
                            {formData.projectType.includes(type) && (
                              <i className="fa-solid fa-check text-white"></i>
                            )}
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Tell us about your project"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border border-teal-500 p-3 rounded-[2px] w-ful bg-teal-500/10 placeholder:text-white outline-none focus:ring-0 focus:border-teal-200 h-24 text-[13px] "
                  ></textarea>

                  <div className="flex flex-row justify-end items-center">
                    <button
                      type="submit"
                      className="border-2 border-teal-700 bg-teal-800/30 w-[150px] text-white py-2 rounded-[2px] hover:bg-teal-800 transition"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading && (
              <div className="flex flex-col justify-center items-center space-x-2 mt-4 h-[380px] max-sm:h-[250px]">
                <div className="loader-dots">
                  <span
                    style={{
                      animation: "dot-blink 1.5s infinite",
                      color: "oklch(0.704 0.14 182.503)",
                    }}
                  ></span>
                  <span
                    style={{
                      animation: "dot-blink 1.5s infinite 0.3s",
                      color: "oklch(0.704 0.14 182.503)",
                    }}
                  ></span>
                  <span
                    style={{
                      animation: "dot-blink 1.5s infinite 0.6s",
                      color: "oklch(0.704 0.14 182.503)",
                    }}
                  ></span>
                </div>
                <p className="text-white text-lg mt-3">Sending your message</p>
              </div>
            )}

            {status === "success" && !loading && (
              <div className="flex flex flex-col justify-center items-center space-x-2 mt-4 h-[380px] max-sm:h-[250px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 border-4 border-teal-500 rounded-full flex justify-center items-center"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-teal-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
                <p className="text-white text-lg mt-3">
                  Thanks for connecting with us!
                </p>
              </div>
            )}

            {status === "failed" && !loading && (
              <div className="flex justify-center items-center space-x-2 mt-4 h-[380px] max-sm:h-[250px]">
                <p className="text-red-500 text-lg">
                  Oops! Something went wrong.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ContactModal;
