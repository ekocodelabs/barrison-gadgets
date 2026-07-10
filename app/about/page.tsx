import AboutPageLayout from "@/myComponents/AboutPageLayout";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutPageLayout />
      <Footer />
    </>
  );
}
