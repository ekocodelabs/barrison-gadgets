import CartPageLayout from "@/myComponents/CartPageLayout";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import React from "react";

export default function CartPage() {
  return (
    <>
      <Navbar isLoggedIn={true} cartCount={5} favIconCount={9} />
      <CartPageLayout />
      <Footer />
    </>
  );
}
