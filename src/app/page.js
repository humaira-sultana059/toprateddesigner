"use client";
import { useState, useEffect, useRef } from "react";
import Blog from "@/components/Blog";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MiddleCont from "@/components/MiddleCont";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Steps from "@/components/Steps";
import TeamNew from "@/components/TeamNew";
import { PartnersSection } from "@/components/PartnersSection";
import Testimonial from "@/components/Testimonial";
import axios from "axios";
import { BASE_URL } from "@/constant";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const [data, setData] = useState(null);
  const [service, setService] = useState(null);
  const [port, setPort] = useState(null);
  const [expert, setExpert] = useState(null);
  const [review, setReview] = useState(null);
  const [patner, setPatner] = useState(null);
  const [blog, setBlog] = useState(null);
  const [award, setAward] = useState(null);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Set a timeout for 3 minutes (180000 milliseconds)
    const timeoutId = setTimeout(() => {
      if (
        !data &&
        !service &&
        !port &&
        !expert &&
        !review &&
        !patner &&
        !blog &&
        !award
      ) {
        setLoadingTimeout(true);
      }
    }, 120000);

    return () => clearTimeout(timeoutId);
  }, [data, service, port, expert, review, patner, blog, award]);

  const fetchAllData = async () => {
    try {
      // Use Promise.all to make both requests concurrently
      const [
        websiteResponse,
        wedosResponse,
        portRes,
        experRes,
        reviewRes,
        patnerRes,
        blogRes,
        awardRes,
      ] = await Promise.all([
        axios.get(`${BASE_URL}/website`),
        axios.get(`${BASE_URL}/wedos`),
        axios.get(`${BASE_URL}/portfolios`),
        axios.get(`${BASE_URL}/experts`),
        axios.get(`${BASE_URL}/reviews`),
        axios.get(`${BASE_URL}/patners`),
        axios.get(`${BASE_URL}/blogs`),
        axios.get(`${BASE_URL}/award`),
      ]);

      setData(websiteResponse.data[0]);
      setService(wedosResponse.data);
      setPort(portRes.data);
      setExpert(experRes.data);
      setReview(reviewRes.data);
      setPatner(patnerRes.data);
      setBlog(blogRes.data);
      setAward(awardRes.data);
      // console.log(patnerRes.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setFooterVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  if (loadingTimeout || error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md text-center">
          {/* Replace with your actual logo path */}
          <img
            src="/assets/logo-2.svg"
            alt="Agency Logo"
            width={200}
            height={100}
            className="mx-auto mb-6"
          />
          <h1 className="text-[20px] font-lato font-medium text-gray-500 mb-4">
            {error ? "Server Error" : "Taking longer than expected!"}
          </h1>
          <p className="text-gray-600 mb-6 text-[13px]">
            {error
              ? "We're experiencing server issues. Please try again later."
              : "We're working on getting your data. Please bear with us or try refreshing the page."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  //  console.log(blog);
  if (
    !data &&
    !service &&
    !port &&
    !expert &&
    !review &&
    !patner &&
    !blog &&
    !award
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Loading spinner or your logo */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-[26px] font-write font-semibold text-white">
            Wait a While...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {!footerVisible && (
        <Navbar setIsModalOpen={setIsModalOpen} logo={data?.image} />
      )}
      <HeroSection setIsModalOpen={setIsModalOpen} image={data?.logo} />
      <MiddleCont service={service} />
      <Steps />
      <Portfolio port={port} />
      <TeamNew expert={expert} />
      <Testimonial review={review} />
      <PartnersSection patner={patner} />
      <Blog blog={blog} />
      <div ref={footerRef}>
        <Footer
          award={award}
          logo={data?.image}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
