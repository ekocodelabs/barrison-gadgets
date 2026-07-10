import CartPageLayout from "@/myComponents/CartPageLayout";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import React from "react";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CartPageLayout />
      <Footer />
    </>
  );
}
