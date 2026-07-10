import FavoritePageLayout from "@/myComponents/FavoritePageLayout";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import React from "react";

export default function FavoritePage() {
  return (
    <>
      <Navbar />
      <FavoritePageLayout />
      <Footer />
    </>
  );
}
