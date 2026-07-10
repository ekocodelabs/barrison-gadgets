import CheckoutPageLayout from "@/myComponents/CheckoutPageLayout";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import React from "react";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <CheckoutPageLayout />
      <Footer />
    </>
  );
}
