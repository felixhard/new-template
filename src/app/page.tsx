"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ContactUs from "@/components/home/ContactUs";
import Customers from "@/components/home/Customers";
import FAQ from "@/components/home/FAQ";
import Pricing from "@/components/home/Pricing";
import Reviews from "@/components/home/Reviews";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import WhyUs from "@/components/home/WhyUs";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-background">
      <Navbar />

      <Hero />

      <WhatWeBuild />

      {/* <Customers />

      <WhyUs />

      <Reviews /> */}

      <Pricing />

      <ContactUs />

      <FAQ />

      <Footer />
    </div>
  );
}
