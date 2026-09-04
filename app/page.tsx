import { AudioBanner } from "@/myComponents/AudioBanner";
import { Banner } from "@/myComponents/Banner";
import { ContactLayout } from "@/myComponents/ContactLayout";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import { PowerbankBanner } from "@/myComponents/PowerBankBanner";
import { SpeakerBanner } from "@/myComponents/SpeakerBanner";
import { Contact } from "lucide-react";

export default async function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <PowerbankBanner />
      <AudioBanner />
      <SpeakerBanner />
      <ContactLayout />
      <Footer />
    </>
  );
}
