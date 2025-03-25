"use client";
import ContactModal from "@/components/ContactModal";
import { blogDetails } from "@/constants/constants";
import Link from "next/link";
import React, { use, useState } from "react";

function Page({ searchParams }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //  const { slug } = use(params)
  const { blog } = use(searchParams);
  const blogItem = JSON.parse(blog);
  const { id, name } = blogItem;

  const filteredBlog = blogDetails.filter((item) => item.id === id)[0];

  return (
    <div>
      {/* home button */}
      <Link
        href="/"
        className="bg-gradient-to-r from-cyan-500/70 to-blue-500/70 blackdrop-blur-lg text-white px-2 py-1 rounded-md fixed top-5 left-10 max-sm:left-5 flex flex-row font-alata items-center text-[12px] max-sm:text-[11px]"
      >
        <img src="/assets/logo-2.svg" className="w-[70px] h-[30px]" />
        <i className="fa-solid fa-house mr-1 text-[10px] max-sm:text-[8px]"></i>
        <p>Home</p>
      </Link>
      <div className="px-10 max-md:px-5 pb-20">
        <div className="flex flex-row justify-center">
          <img
            src={filteredBlog.images}
            className="h-[500px] max-sm:h-[380px] w-full object-contain"
          />
        </div>
        <h2 className="text-[48px] max-md:text-[24px] font-semobold font-sans ">
          {name}
        </h2>
        {filteredBlog.desc()}
      </div>

      {/* Floating Button - Fixed at the Bottom & Centered */}
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 
        bg-gradient-to-r from-blue-500 to-purple-500 text-white 
        px-6 max-sm:px-2 py-3 w-[230px] max-sm:w-[180px] text-center rounded-lg 
        shadow-lg transition-all duration-300 ease-in-out
       hover:shadow-[0px_0px_20px_5px_rgba(59,130,246,0.3),0px_0px_20px_5px_rgba(139,92,246,0.3)] 
        flex flex-row items-center gap-2 group"
      >
        <p className="ml-2 max-sm:ml-4 font-alata text-[16px] max-sm:text-[13px] text-white font-semibold hover:font-bold">
          Let's Start a Project
        </p>
        <div className="absolute right-5 top-[21px] transform -translate-y-1/2 duration-500">
          <span className="inline-block animate-slide text-2xl max-sm:text-lg text-white">
            →
          </span>
        </div>
      </button>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Page;
