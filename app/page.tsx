import { AudioBanner } from "@/myComponents/AudioBanner";
import { Banner } from "@/myComponents/Banner";
import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import { PowerbankBanner } from "@/myComponents/PowerBankBanner";
import { SpeakerBanner } from "@/myComponents/SpeakerBanner";

export default function Home() {
  return (
    <>
      <Navbar isLoggedIn={true} cartCount={5} favIconCount={9} />
      <Banner />
      <PowerbankBanner />
      <AudioBanner />
      <SpeakerBanner />
      <Footer />
    </>
  );
}
