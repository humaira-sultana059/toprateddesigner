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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);

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

  return (
    <div className="min-h-screen">
      {!footerVisible && <Navbar setIsModalOpen={setIsModalOpen} />}
      <HeroSection setIsModalOpen={setIsModalOpen} />
      <MiddleCont />
      <Steps />
      <Portfolio />
      <TeamNew />
      <Testimonial />
      <PartnersSection />
      <Blog />
      <div ref={footerRef}>
        <Footer setIsModalOpen={setIsModalOpen} />
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
