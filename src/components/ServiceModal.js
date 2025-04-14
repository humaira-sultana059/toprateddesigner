import React, { useEffect } from "react";
import { motion } from "framer-motion";

function ServiceModal({ setShowModal, service }) {
  // Disable scrolling when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling when modal closes
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setShowModal(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-black/70 py-6 px-3 rounded-xl border-[1px] border-teal-500 w-[90%] max-w-lg max-sm:h-[70vh] text-center text-white relative overflow-hidden mt-10 md:mt-15 max-sm:mx-3 flex flex-col"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 max-sm:top-[6px] max-sm:right-[8px] text-gray-300 hover:text-gray-100 text-lg"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-2">
            <img
              src={service.image || "/assets/web.png"}
              alt="Web application development icon"
              width="60"
              height="60"
              loading="lazy"
            />
          </div>
          <h2 className="text-2xl font-bold">{service.title}</h2>
        </div>
        <div className="max-sm:flex-grow max-sm:overflow-y-scroll scrollbar-hide">
          <p className="text-[13px] max-sm:text-[11px] bg-gray-300/10 border-[1px] border-white/10 backdrop-blur-lg text-stone-300 font-medium text-left mt-4 px-2 py-3 rounded-[6px] mx-2">
            {service.desc}
          </p>

          {/* Scrollable Content */}
          <div className="mt-4  px-2">
            <ul className="flex flex-col gap-3 text-left pb-4">
              {service.service?.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center max-sm:text-[12px] text-stone-200 px-2 rounded-lg"
                >
                  <i className="fa-regular fa-circle text-teal-500 text-[10px] mr-2"></i>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ServiceModal;
