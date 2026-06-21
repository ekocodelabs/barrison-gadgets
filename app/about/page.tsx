import AboutPageLayout from "@/myComponents/AboutPageLayout";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <Navbar isLoggedIn={true} cartCount={5} favIconCount={9} />
      <AboutPageLayout />
      <Footer />
    </>
  );
}
